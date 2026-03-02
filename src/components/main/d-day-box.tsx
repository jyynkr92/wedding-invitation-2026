import { motion } from 'motion/react';

const getDday = () => {
  const today = new Date();
  const event = new Date('2026-05-30T13:00:00+09:00');
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
      className="fixed w-[280px] left-1/2 -translate-x-1/2 bottom-50 z-10 px-7 py-4 rounded-2xl bg-white/40 shadow-[0_2px_8px_rgba(0,0,0,0.06)] flex flex-col items-center gap-2"
    >
      <span className="text-2xl font-extrabold text-[#005493] pretendard tracking-widest">
        D-{dday}
      </span>
      <span className="text-lg font-semibold text-gray-700 pretendard tracking-wide">
        2026년 05월 30일 토요일
      </span>
    </motion.div>
  );
};
