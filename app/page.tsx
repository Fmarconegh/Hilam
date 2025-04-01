'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface ChatMessage {
  question: string
  answer: string
  sources: string
}

export default function Page() {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [chat, setChat] = useState<ChatMessage[]>([])

  const askHilamIA = async () => {
    if (!input.trim()) return
    setLoading(true)

    try {
      const res = await fetch('https://da643203-bea5-4c84-9648-c9f294b2a682-00-3nw6v6g1vn8y8.spock.replit.dev/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: input }),
      })
      const data = await res.json()
      setChat([...chat, { question: input, answer: data.answer, sources: data.sources }])
    } catch (error) {
      setChat([...chat, { question: input, answer: '❌ Error al conectar con HilamIA.', sources: '' }])
    }

    setInput('')
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#fff8f2] to-[#fff3e6] text-gray-900 px-6 py-8 flex flex-col items-center relative overflow-hidden">
      {/* Fondo dinámico */}
      <div className="absolute inset-0 z-0 animate-pulse bg-gradient-to-br from-orange-100/20 to-white pointer-events-none" />

      {/* Nube animada flotando */}
      <motion.div
        className="absolute top-4 right-6 w-32 h-32 rounded-full bg-orange-300 blur-2xl opacity-60 shadow-xl"
        animate={{ scale: [1, 1.15, 1], y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <h1 className="text-4xl font-bold text-orange-600 z-10">HilamIA</h1>
      <p className="text-center mt-2 max-w-xl z-10">
        Pregúntale a HilamIA sobre la nueva revolución de construir de forma eficiente y sustentable con madera.
      </p>

      {/* Chat */}
      <div className="mt-6 w-full max-w-2xl z-10 space-y-4">
        {chat.map((entry, i) => (
          <div key={i} className="bg-white rounded-3xl shadow p-4">
            <p className="font-semibold">Tú: {entry.question}</p>
            <p className="mt-2 whitespace-pre-line">🧠 HilamIA: {entry.answer}</p>
            {entry.sources && <p className="mt-1 text-sm text-gray-500 italic">Fuente: {entry.sources}</p>}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="mt-6 w-full max-w-2xl flex gap-2 z-10">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={2}
          placeholder="¿Qué quieres saber?"
          className="flex-1 border border-orange-300 rounded-3xl p-4 focus:outline-none resize-none shadow-sm bg-white"
        />
        <button
          onClick={askHilamIA}
          disabled={loading}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-3xl shadow-lg transition disabled:opacity-50"
        >
          {loading ? 'Consultando...' : 'Preguntar'}
        </button>
      </div>

      {/* Sugerencia continua */}
      <p className="text-sm text-gray-500 mt-6 z-10">¿Tienes otra duda? HilamIA está aquí para ayudarte.</p>
    </main>
  )
}
