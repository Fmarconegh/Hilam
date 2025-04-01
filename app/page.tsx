'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface ChatMessage {
  question: string;
  answer: string;
  sources: string;
}

export default function Page() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [chat, setChat] = useState<ChatMessage[]>([]);

  const askHilamIA = async () => {
    if (!input.trim()) return;
    setLoading(true);

    try {
      const res = await fetch('https://da643203-bea5-4c84-9648-c9f294b2a682-00-3nw6v6g1vn8y8.spock.replit.dev/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: input }),
      });
      const data = await res.json();
      setChat([...chat, { question: input, answer: data.answer, sources: data.sources }]);
    } catch (error) {
      setChat([...chat, { question: input, answer: '❌ Error al conectar con HilamIA.', sources: '' }]);
    }

    setInput('');
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#fef9f3] to-[#fffaf5] text-gray-800 px-4 py-6 flex flex-col items-center relative overflow-hidden">
      {/* Fondo dinámico */}
      <div className="absolute inset-0 z-0 animate-pulse bg-gradient-to-br from-orange-100/10 to-white pointer-events-none" />

      {/* Nube Inteligente */}
      <motion.div
        className="absolute top-4 right-10 w-32 h-32 rounded-full bg-orange-300 blur-2xl opacity-60"
        animate={{ scale: [1, 1.1, 1], y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* Título */}
      <h1 className="text-4xl font-bold text-orange-600 z-10">HilamIA</h1>
      <p className="text-center mt-2 max-w-xl z-10">
        Pregúntale a HilamIA sobre la nueva revolución de construir de forma eficiente y sustentable con madera.
      </p>

      {/* Área de Pregunta */}
      <div className="mt-6 w-full max-w-2xl flex gap-2 z-10">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={2}
          placeholder="¿Qué quieres saber?"
          className="flex-1 border border-orange-300 rounded-2xl p-4 focus:outline-none resize-none shadow-sm"
        />
        <button
          onClick={askHilamIA}
          disabled={loading}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-2xl shadow-lg transition disabled:opacity-50"
        >
          {loading ? 'Consultando...' : 'Preguntar'}
        </button>
      </div>

      {/* Conversación */}
      <div className="mt-8 w-full max-w-2xl space-y-6 z-10">
        {chat.map((msg, idx) => (
          <div key={idx} className="bg-white p-4 rounded-2xl shadow-md border border-orange-100">
            <p className="text-sm text-gray-500 font-medium">Tú:</p>
            <p className="mb-2">{msg.question}</p>
            <p className="text-sm text-gray-500 font-medium mt-4">HilamIA:</p>
            <p>{msg.answer}</p>
            {msg.sources && (
              <p className="text-xs text-gray-400 italic mt-2">Fuente: {msg.sources}</p>
            )}
          </div>
        ))}
      </div>

      {/* CTA */}
      {chat.length > 0 && (
        <p className="mt-10 text-sm text-gray-500 z-10">¿Hay otra duda que pueda ayudarte a resolver?</p>
      )}
    </main>
  );
}

