"use client";

import { useState } from "react";
import { CheckCircle, Mail } from "lucide-react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // Aquí podrías llamar una API real
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section className="max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-8 my-16 text-center border border-gray-200 dark:border-gray-700">
      <div className="flex flex-col items-center gap-3">
        <Mail className="text-blue-600 dark:text-blue-400 w-8 h-8" />
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Suscríbete al boletín de pascal.dev
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
          Recibe contenido exclusivo, tutoriales y tips para monetizar tus ideas. Una vez por semana. Sin spam, lo prometemos.
        </p>
      </div>

      {submitted ? (
        <div className="mt-6 flex items-center justify-center gap-2 text-green-600 dark:text-green-400 font-semibold">
          <CheckCircle className="w-5 h-5" />
          ¡Gracias por suscribirte!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col sm:flex-row items-center gap-4">
          <input
            type="email"
            required
            placeholder="Ingresa tu correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full sm:w-auto flex-1 px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
          >
            Unirme
          </button>
        </form>
      )}
    </section>
  );
}
