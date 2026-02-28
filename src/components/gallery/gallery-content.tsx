import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const IMAGE_COUNT = 12;

export const GalleryContent = () => {
  const images = useMemo(
    () =>
      Array.from({ length: IMAGE_COUNT }).map(
        (_, i) => `/image/gallery/${String(i + 1).padStart(4, '0')}.jpg`,
      ),
    [],
  );

  const [index, setIndex] = useState<number | null>(null);
  const isOpen = index !== null;

  const openAt = useCallback((i: number) => setIndex(i), []);
  const close = useCallback(() => setIndex(null), []);
  const showPrev = useCallback(
    () => setIndex((v) => (v === null ? null : (v - 1 + images.length) % images.length)),
    [images.length],
  );
  const showNext = useCallback(
    () => setIndex((v) => (v === null ? null : (v + 1) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, close, showPrev, showNext]);

  return (
    <div>
      <motion.h2
        className="carattere-regular text-5xl text-gray-800 mb-6 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Gallery
      </motion.h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => openAt(i)}
            className="rounded-md overflow-hidden bg-gray-100 w-full h-24 sm:h-28"
            aria-label={`Open gallery image ${i + 1}`}
          >
            <img
              src={src}
              alt={`gallery-${i + 1}`}
              className="w-full h-full object-cover"
              draggable={false}
              loading="lazy"
              decoding="async"
            />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="gallery-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-60 backdrop-blur-xl backdrop-saturate-150 bg-white/10"
            onClick={close}
          />
        )}
        {isOpen && (
          <motion.div
            key="gallery-content"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="fixed inset-0 z-70 flex items-center justify-center p-6"
          >
            <div
              className="relative max-w-[90vw] max-h-[90vh] w-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[index ?? 0]}
                alt={`gallery-large-${(index ?? 0) + 1}`}
                className="object-contain max-w-full max-h-full rounded-md"
                draggable={false}
                onDragStart={(e) => e.preventDefault()}
                style={{ touchAction: 'none', userSelect: 'none' }}
                onDoubleClick={(e) => e.preventDefault()}
                onWheel={(e) => {
                  if ((e as unknown as WheelEvent).ctrlKey) e.preventDefault();
                }}
              />

              <button
                onClick={close}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center text-gray-600"
              >
                <X size={16} />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  showPrev();
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/40 backdrop-blur-sm flex items-center justify-center text-gray-700"
              >
                <ChevronLeft />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  showNext();
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/40 backdrop-blur-sm flex items-center justify-center text-gray-700"
              >
                <ChevronRight />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryContent;
