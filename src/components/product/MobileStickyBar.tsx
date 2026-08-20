interface Props {
  onAddToQuote: () => void;
  onRequestSample: () => void;
}

/** Fixed bottom bar shown only on mobile, mirroring the two desktop CTA buttons. */
export function MobileStickyBar({ onAddToQuote, onRequestSample }: Props) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex gap-2.5 border-t border-line bg-white px-4 py-3 shadow-[0_-8px_24px_-12px_rgba(51,58,63,0.2)] md:hidden">
      <button onClick={onRequestSample} className="rounded-full border-2 border-line px-5 py-3 text-sm font-bold">
        Sample
      </button>
      <button onClick={onAddToQuote} className="flex-1 rounded-full bg-brand-green px-5 py-3 text-sm font-bold text-white">
        Add to my quote
      </button>
    </div>
  );
}
