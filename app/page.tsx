"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  const API_URL =
    "https://da643203-bea5-4c84-9648-c9f294b2a682-00-3nw6v6g1vn8y8.spock.replit.dev/api/ask";

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    setInput("");

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input }),
      });
      const data = await res.json();
      const botMessage = {
        role: "hilam",
        content: `${data.answer} ${data.sources ? `\n\n📄 Fuente: ${data.sources}` : ""}`,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "hilam", content: "❌ Error al conectar con HilamIA." },
      ]);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 relative">
      {/* Nube Inteligente */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="absolute top-4 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{
            scale: [1, 1.03, 0.97, 1],
            transition: { repeat: Infinity, duration: 6 },
          }}
          className="bg-gradient-to-br from-orange-300 to-orange-500 shadow-lg rounded-full w-40 h-40 blur-sm opacity-70"
        ></motion.div>
      </motion.div>
