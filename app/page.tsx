"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function Page() {
  const [question, setQuestion] = useState("");
  const [chat, setChat] = useState<{ user: string; ai: string; sources?: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const API_URL = "https://da643203-bea5-4c84-9648-c9f294b2a682-00-3nw6v6g1vn8y8.spock.replit.dev/api/ask";

  const handleAsk = async () => {
    if (!question.trim()) return;
    setLoading(true);
    const currentQuestion = question;
    setQuestion("");
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: currentQuestion }),
      });
      const data = await res.json();
      setChat((prev) => [...prev, { user: currentQuestion, ai: data.answer, sources: data.sources }]);
    } catch (err) {
      setChat((prev) => [...prev, { user: currentQuestion, ai: "❌ Error al conectar con HilamIA." }]);
    }
    setLoading(false);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white p-4 text-gray-800 font-sans relative overflow-hidden">
      {/* Nube Inteligente */}
      <motion.div
        className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-6 w-64 h-64 bg-gradient-to-br from-orange-200 to-orange-100 rounded-full blur-3xl opacity-70 shadow-2xl z-0"
        animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <div className="relative z-10 max-w-2xl mx-auto bg-white/90 shadow-xl rounded-3xl p-6">
        <h1 className="text-3xl font-bold text-orange-600 mb-2">HilamIA</h1>
        <p className="mb-4 text-gray-700">
          Pregúntale a HilamIA sobre la nueva revolución de construir de forma eficiente y sustentable con madera.
        </p>

        {/* Chat histórico */}
        <div className="h-96 overflow-y-auto space-y-4 p-2 border rounded-md bg-gray-50">
          {chat.map((msg, idx) => (
            <div key={idx} className="space-y-1">
              <div className="text-right">
                <span className="inline-block bg-orange-100 text-orange-800 px-3 py-1 rounded-xl">{msg.user}</span>
              </div>
              <div className="text-left">
                <span className="inline-block bg-white shadow px-3 py-2 rounded-xl">
                  {msg.ai}
                  {msg.sources && (
                    <div className="text-xs text-gray-500 mt-1 italic">Fuente: {msg.sources}</div>
                  )}
                </span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input y botón */}
        <div className="mt-4 flex flex-col sm:flex-row gap-2">
          <textarea
            className="flex-1 p-3 border rounded-xl shadow focus:outline-none focus:ring-2 focus:ring-orange-300 resize-none"
            placeholder="¿Qué quieres saber?"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows={2}
          />
          <button
            onClick={handleAsk}
            disabled={loading}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-xl shadow-lg transition-all duration-200"
          >
            {loading ? "Pensando..." : "Preguntar"}
          </button>
        </div>
      </div>
    </div>
  );
}
