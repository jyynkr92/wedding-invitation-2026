import { motion } from 'motion/react';

const MAY_DAYS = [
  [null, null, null, null, null, 1, 2],
  [3, 4, 5, 6, 7, 8, 9],
  [10, 11, 12, 13, 14, 15, 16],
  [17, 18, 19, 20, 21, 22, 23],
  [24, 25, 26, 27, 28, 29, 30],
  [31, null, null, null, null, null, null],
];

const DAY_LABELS = ['일', '월', '화', '수', '목', '금', '토'];

const MayCalendar = () => (
  <motion.div
    className="w-full flex flex-col items-center gap-3"
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.6 }}
  >
    <div className="w-full rounded-2xl bg-white/40 backdrop-blur-sm border border-white/50 p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
      <div className="text-xl font-light text-gray-700 tracking-widest text-center mb-5">
        2026. 05.
      </div>
      <div className="grid grid-cols-7 mb-2">
        {DAY_LABELS.map((d) => (
          <div
            key={d}
            className={`text-center text-[11px] font-semibold py-1 ${d === '일' ? 'text-red-400' : d === '토' ? 'text-blue-400' : 'text-gray-400'}`}
          >
            {d}
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-1">
        {MAY_DAYS.map((week, wi) => (
          <div key={wi} className="grid grid-cols-7">
            {week.map((day, di) => {
              const isHighlight = day === 30;
              const isSun = di === 0;
              const isSat = di === 6;
              return (
                <div key={di} className="flex flex-col items-center justify-start py-0.5 gap-1">
                  {day !== null ? (
                    <>
                      <div
                        className={`w-8 h-8 flex items-center justify-center rounded-full text-[13px] font-medium transition-all
                          ${isHighlight ? 'bg-rose-400 text-white shadow-[0_2px_8px_rgba(244,63,94,0.35)]' : isSun ? 'text-red-400' : isSat ? 'text-blue-400' : 'text-gray-700'}`}
                      >
                        {day}
                      </div>
                      {isHighlight && (
                        <span className="text-[9px] text-[#005493] leading-3">오후 1시</span>
                      )}
                    </>
                  ) : null}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
    <motion.p
      className="text-gray-600 tracking-wide mt-7 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.8 }}
    >
      2026년 5월 30일 <span className="text-[#005493]">토요일 오후 1시</span>
      <br />
      L7 광명 바이 롯데호텔 3층
    </motion.p>
  </motion.div>
);

export default MayCalendar;
