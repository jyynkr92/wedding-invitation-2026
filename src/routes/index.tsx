import { createFileRoute } from '@tanstack/react-router';
import { motion } from 'motion/react';
import { BottomDock } from '../components/main/bottom-dock';
import { DDayBox } from '../components/main/d-day-box';

export const Route = createFileRoute('/')({ component: App });

function App() {
  const words = [
    { text: "We're", offset: '-55%' },
    { text: 'Getting', offset: '-14%' },
    { text: 'Married!', offset: '40%' },
  ];

  return (
    <div className="relative h-screen max-w-140 mx-auto bg-bottom bg-no-repeat bg-main overflow-hidden">
      <div
        className="absolute flex flex-col items-center w-full z-0"
        style={{ top: 'clamp(2.5rem, 9.8dvh, 8rem)', paddingInline: '8px' }}
      >
        {words.map((word, index) => (
          <motion.div
            key={word.text}
            className="text-yellow-500 carattere-bold -rotate-13"
            style={{
              fontSize: 'clamp(3rem, 15vw, 4rem)',
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
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
        style={{ backgroundImage: "url('/image/main_image.png')" }}
        className="absolute -bottom-1 max-w-140 left-0 w-full h-3/4 bg-cover bg-bottom bg-no-repeat pointer-events-none z-10"
      />
      <DDayBox />
      <BottomDock />
    </div>
  );
}
