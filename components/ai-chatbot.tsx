import { MessageCircle } from "lucide-react";

export default function AiChatbot() {
  return (
    <button
      className="fixed bottom-4 right-4 z-50 bg-primary text-white rounded-full p-4 shadow-lg hover:bg-primary/90 transition"
      aria-label="Abrir chatbot"
      // onClick={...} // Aquí puedes abrir un modal/chat real
    >
      <MessageCircle className="h-6 w-6" />
    </button>
  );
} 