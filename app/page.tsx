"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export default function Page() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState<{ answer: string; sources: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const API_URL = "https://da643203-bea5-4c84-9648-c9f294b2a682-00-3nw6v6g1vn8y8.spock.replit.dev/api/ask";

  const checkBackendStatus = async () => {
    try {
      const res = await fetch(API_URL.replace("/api/ask", "/"));
      const data = await res.json();
      return data?.message?.includes("activo");
    } catch {
      return false;
    }
  };

  const handleAsk = async () => {
    if (!question.trim()) return;
    setLoading(true);

    const backendOk = await checkBackendStatus();
    if (!backendOk) {
      setResponse({
        answer: "❌ No se pudo conectar con HilamIA. Intenta nuevamente en unos segundos.",
        sources: ""
      });
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setResponse({
        answer: "❌ Error inesperado al contactar con HilamIA.",
        sources: ""
      });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50 flex justify-center items-start pt-10">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-6 space-y-4">
        <h1 className="text-3xl font-bold text-orange-600">HilamIA</h1>
        <p className="text-gray-600">
          Pregúntale a HilamIA sobre la nueva revolución de construir de forma eficiente y sustentable con madera.
        </p>

        {response && (
          <div className="bg-gray-50 p-4 rounded-xl border border-orange-100">
            <p className="text-gray-800 whitespace-pre-line">{response.answer}</p>
            {response.sources && (
              <p className="text-xs text-gray-500 mt-2 italic">Fuente(s): {response.sources}</p>
            )}
          </div>
        )}

        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="¿Qué quieres saber?"
            className="flex-1 border border-orange-300 rounded-xl px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAsk()}
          />
          <button
            onClick={handleAsk}
            disabled={loading}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl shadow transition"
          >
            <Send size={16} />
          </button>
        </div>
        <p className="text-sm text-gray-500 text-center">¿Tienes otra duda? HilamIA está aquí para ayudarte.</p>
      </div>
    </div>
  );
}
