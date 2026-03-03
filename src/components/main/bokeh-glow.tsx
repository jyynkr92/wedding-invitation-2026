import { motion } from 'motion/react';

type GlowItem = {
  id: number;
  sizeClass: string;
  positionStyle: { top?: string; left?: string; right?: string; bottom?: string };
  colorClass: string;
  drift: { x: number[]; y: number[] };
  delay: number;
  duration: number;
};

const glowItems: GlowItem[] = [
  {
    id: 1,
    sizeClass: 'w-30 h-30',
    positionStyle: { top: '8%', left: '-8%' },
    colorClass: 'bg-amber-300',
    drift: { x: [0, 10, 100, 0], y: [0, -10, -5, 0] },
    delay: 0,
    duration: 8,
  },
  {
    id: 2,
    sizeClass: 'w-30 h-30',
    positionStyle: { top: '16%', right: '-14%' },
    colorClass: 'bg-yellow-300',
    drift: { x: [0, -14, 10, 0], y: [0, 8, -8, 0] },
    delay: 0.6,
    duration: 8.5,
  },
];

export const BokehGlow = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-[48%] pointer-events-none overflow-hidden z-5">
      {glowItems.map((item) => (
        <motion.div
          key={item.id}
          className={`absolute rounded-full blur-3xl ${item.sizeClass} ${item.colorClass}`}
          style={{ ...item.positionStyle, opacity: 0.36 }}
          initial={false}
          animate={{
            opacity: [0.4, 0.8, 0.4],
            scale: [0.95, 1.06, 0.95],
            x: item.drift.x,
            y: item.drift.y,
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};
