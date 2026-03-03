import { createFileRoute } from '@tanstack/react-router';
import { motion } from 'motion/react';
import { BottomDock } from '../components/main/bottom-dock';
import { DDayBox } from '../components/main/d-day-box';
import PetalCanvas from '@/components/information/petal-canvas';
import { useEffect, useRef, useState } from 'react';

export const Route = createFileRoute('/')({ component: App });

function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMainImageLoaded, setIsMainImageLoaded] = useState<boolean>(false);

  useEffect(() => {
    const image = new Image();
    image.src = '/image/main_image_v3.png';

    if (image.complete) {
      setIsMainImageLoaded(true);
      return;
    }

    const handleLoad = () => setIsMainImageLoaded(true);
    image.addEventListener('load', handleLoad);

    return () => {
      image.removeEventListener('load', handleLoad);
    };
  }, []);

  const words = [
    { text: "We're", offset: '-55%' },
    { text: 'Getting', offset: '-14%' },
    { text: 'Married!', offset: '40%' },
  ];

  return (
    <div
      ref={containerRef}
      className="relative h-dvh max-w-140 mx-auto bg-bottom bg-no-repeat bg-main overflow-hidden"
    >
      <PetalCanvas containerRef={containerRef} counts={40} />
      <div
        className="absolute flex flex-col items-center w-full z-10"
        style={{ top: 'clamp(2.5rem, 8.5dvh, 8rem)', paddingInline: '8px' }}
      >
        {words.map((word, index) => (
          <motion.div
            key={word.text}
            className="text-gray-500 carattere-regular -rotate-13"
            style={{
              fontSize: 'clamp(3rem, 14vw, 4rem)',
              lineHeight: 0.8,
              marginLeft: word.offset,
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: index * 0.4, ease: 'easeOut' }}
          >
            {word.text}
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isMainImageLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
        style={{ backgroundImage: "url('/image/main_image_v3.png')" }}
        className="absolute -bottom-1 max-w-140 left-0 w-full h-3/4 bg-cover bg-bottom bg-no-repeat pointer-events-none z-10"
      />
      <DDayBox />
      <BottomDock />
    </div>
  );
}
