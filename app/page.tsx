"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { SendHorizonal } from "lucide-react";

export default function Page() {
  const [question, setQuestion] = useState("");
  const [chat, setChat] = useState<{ user: string; ai: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const API_URL = "https://da643203-bea5-4c84-9648-c9f294b2a682-00-3nw6v6g1vn8y8.spock.replit.dev/api/ask";

  const handleAsk = async () => {
    if (!question.trim()) return;
    const current = question;
    setLoading(true);
    setQuestion("");
    setChat((prev) => [...prev, { user: current, ai: "..." }]);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: current }),
      });
      const data = await res.json();
      setChat((prev) =>
        prev.map((entry, idx) =>
          idx === prev.length - 1 ? { ...entry, ai: data.answer } : entry
        )
      );
    } catch {
      setChat((prev) =>
        prev.map((entry, idx) =>
          idx === prev.length - 1 ? { ...entry, ai: "❌ Error al conectar con HilamIA." } : entry
        )
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex flex-col items-center justify-start p-4">
      {/* Nube animada */}
      <motion.div
        className="absolute top-10 right-10 w-64 h-64 bg-orange-200 rounded-full blur-3xl opacity-60 z-0"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 5 }}
      />

      <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-6 relative z-10">
        <h1 className="text-3xl font-bold text-orange-600">HilamIA</h1>
        <p className="text-gray-600 mt-1">
          Pregúntale a HilamIA sobre la nueva revolución de construir de forma eficiente y sustentable con madera.
        </p>

        {/* Chat box */}
        <div className="mt-4 max-h-[400px] overflow-y-auto space-y-4 pr-2 scroll-smooth">
          {chat.map((entry, i) => (
            <div key={i} className="space-y-2">
              <div className="text-right">
                <span className="inline-block px-3 py-2 bg-orange-100 text-orange-700 rounded-xl">
                  {entry.user}
                </span>
              </div>
              <div className="text-left">
                <span className="inline-block px-3 py-2 bg-gray-100 rounded-xl">
                  {entry.ai}
                </span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="flex items-center mt-4 gap-2">
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAsk()}
            placeholder="¿Qué quieres saber?"
            className="flex-1 px-4 py-3 border border-orange-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
          <button
            onClick={handleAsk}
            disabled={loading}
            className="px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl shadow-md transition"
          >
            {loading ? "..." : <SendHorizonal size={20} />}
          </button>
        </div>

        {/* Footer */}
        <p className="text-sm text-center text-gray-500 mt-3">
          ¿Tienes otra duda? HilamIA está aquí para ayudarte.
        </p>
      </div>
    </div>
  );
}
