import { MessageCircle } from "lucide-react";

export function WhatsAppFab() {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "910000000000";

  return (
    <a
      href={`https://wa.me/${number}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Serve Made on WhatsApp"
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-brand-green text-white shadow-card-lg transition-transform hover:scale-105"
    >
      <MessageCircle size={26} aria-hidden="true" />
    </a>
  );
}
