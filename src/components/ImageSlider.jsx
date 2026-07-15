import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ImageSlider({ images, alt, className = "" }) {
  const list = images && images.length ? images : [];
  const [index, setIndex] = useState(0);
  const dragStartX = useRef(null);

  if (list.length === 0) return null;

  const go = (delta) => setIndex((i) => (i + delta + list.length) % list.length);

  const onPointerDown = (e) => {
    dragStartX.current = e.clientX;
  };
  const onPointerUp = (e) => {
    if (dragStartX.current == null) return;
    const dx = e.clientX - dragStartX.current;
    dragStartX.current = null;
    if (Math.abs(dx) > 40) go(dx > 0 ? -1 : 1);
  };

  return (
    <div
      className="relative w-full h-full select-none"
      style={{ touchAction: "pan-y" }}
      onPointerDown={list.length > 1 ? onPointerDown : undefined}
      onPointerUp={list.length > 1 ? onPointerUp : undefined}
    >
      <img src={list[index]} alt={alt} className={className} loading="lazy" draggable={false} />

      {list.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              go(-1);
            }}
            aria-label="Previous photo"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-50 rounded-full bg-ink/60 text-cream p-2 opacity-100 transition-colors hover:bg-ink/75 pointer-events-auto"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              go(1);
            }}
            aria-label="Next photo"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-50 rounded-full bg-ink/60 text-cream p-2 opacity-100 transition-colors hover:bg-ink/75 pointer-events-auto"
          >
            <ChevronRight size={16} />
          </button>

          <div className="absolute bottom-2.5 inset-x-0 z-10 flex items-center justify-center gap-1.5">
            {list.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIndex(i);
                }}
                aria-label={`Go to photo ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-4 bg-gold" : "w-1.5 bg-cream/70"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
