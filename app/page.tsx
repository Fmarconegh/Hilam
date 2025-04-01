"use client";
import { useState, useEffect } from "react";

export default function HilamIA() {
  const [question, setQuestion] = useState("");
  const [chat, setChat] = useState<{ user: string; bot: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const API_URL = "https://da643203-bea5-4c84-9648-c9f294b2a682-00-3nw6v6g1vn8y8.spock.replit.dev/api/ask";

  const handleAsk = async () => {
    if (!question.trim()) return;
    setLoading(true);
    const userQuestion = question;
    setQuestion("");
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userQuestion }),
      });
      const data = await res.json();
      setChat((prev) => [...prev, { user: userQuestion, bot: data.answer }]);
    } catch (err) {
      setChat((prev) => [...prev, { user: userQuestion, bot: "❌ Error al conectar con HilamIA." }]);
    }
    setLoading(false);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-orange-50 to-white px-4 py-8 text-center font-sans">
      {/* Nube animada */}
      <div className="absolute top-[-60px] right-[-60px] w-64 h-64 bg-orange-300 rounded-full opacity-30 blur-3xl animate-pulse z-0" />

      <h1 className="text-4xl font-bold text-orange-600 z-10 relative">HilamIA</h1>
      <p className="text-gray-700 mt-2 z-10 relative">
        Pregúntale a HilamIA sobre la nueva revolución de construir de forma eficiente y sustentable con madera.
      </p>

      <div className="mt-6 space-y-4 max-w-2xl mx-auto z-10 relative">
        {chat.map((entry, i) => (
          <div key={i} className="bg-white/80 rounded-2xl p-4 shadow-md text-left">
            <p className="font-semibold">Tú: {entry.user}</p>
            <p className="mt-2">🌐 HilamIA: {entry.bot}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex max-w-2xl mx-auto z-10 relative">
        <textarea
          className="flex-1 p-4 rounded-2xl border border-orange-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
          placeholder="¿Qué quieres saber?"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          rows={2}
        />
        <button
          onClick={handleAsk}
          disabled={loading}
          className="ml-4 px-6 py-3 rounded-2xl bg-orange-500 text-white font-semibold shadow-lg hover:bg-orange-600 transition disabled:opacity-50"
        >
          {loading ? "Consultando..." : "Preguntar"}
        </button>
      </div>

      <p className="text-sm text-gray-500 mt-4 z-10 relative">
        ¿Tienes otra duda? HilamIA está aquí para ayudarte.
      </p>
    </div>
  );
}
