import { createFileRoute } from '@tanstack/react-router';
import { motion } from 'motion/react';
import { BottomDock } from '../components/main/bottom-dock';
import { DDayBox } from '../components/main/d-day-box';

export const Route = createFileRoute('/')({ component: App });

function App() {
  const words = [
    { text: "We're", ml: '-ml-35' },
    { text: 'Getting', ml: '' },
    { text: 'Married', ml: 'ml-35' },
  ];

  return (
    <div className="relative h-screen max-w-184 mx-auto bg-bottom bg-no-repeat bg-main overflow-hidden">
      <div className="absolute top-[calc(25%-7.8rem)] flex flex-col items-center w-full z-0">
        {words.map((word, index) => (
          <motion.div
            key={word.text}
            className={`text-5xl text-yellow-500 ${word.ml} carattere-bold -rotate-12`}
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
        className="absolute -bottom-1 max-w-184 left-0 w-full h-3/4 bg-cover bg-bottom bg-no-repeat pointer-events-none z-10"
      />
      <DDayBox />
      <BottomDock />
    </div>
  );
}
