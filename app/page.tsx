"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Cloud, Loader2 } from "lucide-react";

export default function HilamIA() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const API_URL = "https://da643203-bea5-4c84-9648-c9f294b2a682-00-3nw6v6g1vn8y8.spock.replit.dev/api/ask";

  const handleAsk = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setResponse(null);
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
        answer: "❌ Error al conectar con HilamIA.",
        sources: "",
      });
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-100 to-white flex flex-col items-center justify-center p-4 text-gray-800">
      <motion.div
        animate={{ y: loading ? [0, -10, 0] : 0 }}
        transition={{ repeat: loading ? Infinity : 0, duration: 1 }}
        className="relative mb-8"
      >
        <Cloud size={120} className="text-orange-400 drop-shadow-lg" />
        {loading && (
          <Loader2 className="absolute top-12 left-12 animate-spin text-orange-600" />
        )}
      </motion.div>

      <h1 className="text-3xl font-bold mb-4">HilamIA</h1>
      <p className="text-center max-w-xl mb-6">
        Pregúntale a HilamIA sobre construcción en madera laminada y CLT. Nuestro agente experto vive en esta nube inteligente ☁️.
      </p>

      <textarea
        className="w-full max-w-xl h-28 p-4 rounded-xl border shadow focus:outline-none focus:ring-2 focus:ring-orange-400"
        placeholder="¿Qué quieres saber?"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <button
        onClick={handleAsk}
        disabled={loading}
        className="mt-4 bg-orange-500 text-white px-6 py-3 rounded-xl hover:bg-orange-600 transition shadow-md"
      >
        {loading ? "Pensando..." : "Preguntar a HilamIA"}
      </button>

      {response && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 bg-white border border-orange-200 shadow-md p-6 rounded-xl max-w-xl w-full"
        >
          <h2 className="text-lg font-semibold mb-2">Respuesta:</h2>
          <p className="mb-2 whitespace-pre-wrap">{response.answer}</p>
          {response.sources && (
            <p className="text-sm text-orange-600">
              <i>{response.sources}</i>
            </p>
          )}
        </motion.div>
      )}
    </main>
  );
}
