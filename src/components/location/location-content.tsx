import NaverMap from './naver-map';
import { motion } from 'motion/react';
import LocationMethod from './location-method';

const LocationContent = () => {
  return (
    <div className="flex flex-col items-center gap-4 py-4">
      <motion.h2
        className="carattere-regular text-5xl text-gray-800"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Location
      </motion.h2>
      <motion.div
        className="text-lg text-gray-800 flex flex-col items-center whitespace-pre-line gap-1 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        L7 광명 바이 롯데호텔
        <span className="font-bold">경기 광명시 신기로 22 3층</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="relative size-full"
      >
        <NaverMap />
      </motion.div>

      <motion.p
        className="text-center text-sm leading-7 text-gray-700 whitespace-pre-line mt-4 flex items-center gap-9"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <a
          href="https://naver.me/xrSQfE7U"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1"
        >
          <img
            src="/image/naver_map_icon.png"
            alt="naver-map"
            className="size-6 bg-white object-contain rounded-md"
          />
          네이버지도
        </a>
        <a
          href="https://kko.to/eUvsS6OVSH"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1"
        >
          <img
            src="/image/kakao_map_icon.png"
            alt="kakao-map"
            className="size-6 object-contain rounded-md bg-[#fae105]"
          />
          카카오맵
        </a>
      </motion.p>
      <LocationMethod />
    </div>
  );
};

export default LocationContent;
