"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function HilamIA() {
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);

  const API_URL = "https://da643203-bea5-4c84-9648-c9f294b2a682-00-3nw6v6g1vn8y8.spock.replit.dev/api/ask";

  const handleAsk = async () => {
    if (!question.trim()) return;
    const userMessage = { type: 'user', text: question };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);
    setQuestion('');
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: userMessage.text })
      });
      const data = await res.json();
      const aiMessage = {
        type: 'hilam',
        text: data.answer,
        source: data.sources || null
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch {
      setMessages(prev => [...prev, { type: 'hilam', text: '❌ Error al conectar con HilamIA.' }]);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fffaf5] to-[#fff1e0] flex flex-col items-center p-4 font-sans">
      <h1 className="text-3xl font-bold text-orange-700 mb-2">HilamIA</h1>
      <p className="text-gray-600 max-w-xl text-center">
        Pregúntale a HilamIA sobre la nueva revolución de construir de forma eficiente y sustentable con madera
      </p>

      <div className="relative w-full max-w-2xl mt-6">
        <div className="absolute top-[-60px] right-4">
          <motion.div
            className="w-24 h-24 bg-orange-300 rounded-full shadow-2xl filter blur-sm"
            animate={{ scale: [1, 1.05, 1], opacity: [0.9, 1, 0.9] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-3 rounded-lg max-w-[80%] ${msg.type === 'user' ? 'bg-orange-100 self-end ml-auto' : 'bg-white text-gray-800 border border-orange-200 self-start'}`}
            >
              <p>{msg.text}</p>
              {msg.source && <p className="text-xs text-gray-400 mt-1 italic">Fuente: {msg.source}</p>}
            </div>
          ))}
          {loading && <p className="text-sm italic text-gray-400">HilamIA está pensando...</p>}
        </div>

        <div className="mt-4 flex gap-2">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="¿Qué quieres saber?"
            className="flex-1 p-2 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button
            onClick={handleAsk}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
            disabled={loading}
          >
            {loading ? '...' : 'Preguntar'}
          </button>
        </div>
      </div>
    </div>
  );
}

