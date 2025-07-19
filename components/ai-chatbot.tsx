"use client";

import React, { useState, useEffect } from "react";

export default function AiChatbot() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Este código se ejecuta solo en el cliente
    console.log("Chatbot cargado en cliente");
  }, []);

  return (
    <button
      onClick={() => setOpen(!open)}
      className="bg-black text-white px-4 py-2 rounded-lg shadow-lg"
    >
      {open ? "Cerrar Chatbot" : "Abrir Chatbot"}
    </button>
  );
}
