"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export default function Page() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<{ type: "user" | "bot"; text: string }[]>([]);
  const [error, setError] = useState("");

  const handleSend = async () => {
    if (!query.trim()) return;
    setMessages([...messages, { type: "user", text: query }]);
    setQuery("");
    setError("");

    try {
      const res = await fetch("https://da643203-bea5-4c84-9648-c9f294b2a682-00-3nw6v6g1vn8y8.spock.replit.dev/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: query }),
      });

      const data = await res.json();
      if (data.answer) {
        setMessages((prev) => [...prev, { type: "bot", text: data.answer }]);
      } else {
        setError("HilamIA no pudo responder en este momento.");
      }
    } catch (err) {
      setError("Error al conectar con HilamIA.");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-orange-50 p-4 flex items-center justify-center">
      <div className="bg-white p-6 rounded-2xl shadow-xl max-w-3xl w-full space-y-4">
        <h1 className="text-2xl font-bold text-orange-600">HilamIA</h1>
        <p className="text-gray-600">
          Pregúntale a HilamIA sobre la nueva revolución de construir de forma eficiente y sustentable con madera.
        </p>

        <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`rounded-xl p-3 text-sm ${m.type === "user" ? "bg-orange-100 text-right ml-auto max-w-xs" : "bg-gray-100 text-left mr-auto max-w-xs"}`}
            >
              {m.text}
            </div>
          ))}
          {error && (
            <div className="text-red-500 text-sm flex items-center gap-1">
              ❌ {error}
            </div>
          )}
        </div>

        <div className="flex items-center border rounded-xl overflow-hidden">
          <input
            type="text"
            className="flex-1 px-4 py-2 outline-none"
            placeholder="¿Qué quieres saber?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2"
            onClick={handleSend}
          >
            <Send className="h-4 w-4" />
          </button>
        </div>

        <p className="text-xs text-center text-gray-500">
          ¿Tienes otra duda? HilamIA está aquí para ayudarte.
        </p>
      </div>
    </main>
  );
}
