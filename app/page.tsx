"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export default function Page() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const API_URL = "https://da643203-bea5-4c84-9648-c9f294b2a682-00-3nw6v6g1vn8y8.spock.replit.dev/api/ask";

  const handleAsk = async () => {
    if (!question.trim()) return;
    const userMsg = { role: "user", text: question };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      const aiMsg = { role: "ai", text: data.answer };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: "error", text: "❌ Error al conectar con HilamIA." }]);
    }
    setQuestion("");
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-orange-50 p-4 flex items-center justify-center">
      <div className="bg-white p-6 rounded-2xl shadow-xl max-w-3xl w-full space-y-4">
        <h1 className="text-2xl font-bold text-orange-600">HilamIA</h1>
        <p className="text-gray-600">Pregúntale a HilamIA sobre la nueva revolución de construir de forma eficiente y sustentable con madera.</p>

        <div className="h-64 overflow-y-auto border rounded-xl p-4 bg-gray-50 space-y-3">
          {messages.map((msg, i) => (
            <div key={i} className={`${msg.role === "user" ? "text-right" : "text-left"} text-sm`}>
              <div className={`${msg.role === "user" ? "bg-orange-100 text-orange-800" : msg.role === "ai" ? "bg-white text-gray-800" : "text-red-500"} inline-block px-3 py-2 rounded-xl shadow-sm`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div className="flex space-x-2 items-center">
          <input
            className="flex-grow border border-orange-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="¿Qué quieres saber?"
