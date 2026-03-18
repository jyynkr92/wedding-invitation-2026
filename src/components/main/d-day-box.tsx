import { motion } from 'motion/react';

const getDday = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const event = new Date(2026, 4, 30);
  event.setHours(0, 0, 0, 0);

  const diff = event.getTime() - today.getTime();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return days;
};

export const DDayBox = () => {
  const dday = getDday();
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
      className="absolute w-65 left-1/2 -translate-x-1/2 bottom-37 z-10 px-7 py-4 rounded-2xl bg-white/40 shadow-[0_2px_8px_rgba(0,0,0,0.06)] flex flex-col items-center gap-2"
    >
      <span className="text-xl text-[#005493] esamanru">D-{dday}</span>
      <div className="flex flex-col items-center gap-0.5">
        <span className="text-gray-700 esamanru">2026년 05월 30일 토요일</span>
        <span className="text-gray-700 esamanru">L7 광명 바이 롯데호텔</span>
      </div>
    </motion.div>
  );
};
