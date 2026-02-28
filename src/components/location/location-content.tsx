import NaverMap from './naver-map';
import { motion } from 'motion/react';

const LocationContent = () => {
  return (
    <div className="flex flex-col items-center gap-4 py-4">
      <motion.h2
        className="carattere-regular text-5xl text-gray-800"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Wedding Location
      </motion.h2>
      <motion.h4
        className="carattere-regular text-3xl text-gray-800"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        테이크호텔 서울 광명
      </motion.h4>
      <motion.h4
        className="carattere-regular text-3xl text-gray-800"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        경기 광명시 신기로 22 3층 루미나스홀
      </motion.h4>
      <NaverMap />
      <motion.p
        className="text-center text-sm leading-7 text-gray-700 whitespace-pre-line mt-4 flex items-center gap-7"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <a href="https://naver.me/xrSQfE7U" target="_blank" rel="noopener noreferrer">
          네이버지도
        </a>
        <a href="https://kko.to/eUvsS6OVSH" target="_blank" rel="noopener noreferrer">
          카카오맵
        </a>
      </motion.p>
    </div>
  );
};

export default LocationContent;
