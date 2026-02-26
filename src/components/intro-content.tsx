import { useState } from 'react'
import { motion } from 'motion/react'
import { GiftAccountModal } from './gift-account-modal'
import MayCalendar from './ may-calendar'
import HeartFillIcon from '@/icons/heart-fill-icon'

export const IntroContent = () => {
  const [giftModal, setGiftModal] = useState<'bride' | 'groom' | null>(null)

  return (
    <div className="flex flex-col items-center gap-4 py-4">
      <motion.img
        src="/image/ground_icon.png"
        alt="ground"
        className="size-17 object-contain"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      />
      <motion.h2
        className="carattere-regular text-5xl text-gray-800"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Our wedding day
      </motion.h2>
      <motion.img
        src="/image/baseball_divider_icon.png"
        alt="divider"
        className="w-7 object-contain my-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      />
      <motion.p
        className="text-center text-sm leading-7 text-gray-700 whitespace-pre-line"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {`두 사람이 만나\n최고의 배터리를 이루어\n평생 함께할 경기를 시작하고자 합니다.\n직관 오셔서 저희의 새로운 출발을\n축복해 주시면 감사하겠습니다.`}
      </motion.p>
      <motion.p
        className="text-center text-sm leading-7 text-gray-700 whitespace-pre-line border-t border-b border-gray-400 py-5 my-5"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {`송준일 · 권정숙의 아들 형근\n 김영기 · 유영춘의 딸 진선`}
      </motion.p>
      <motion.img
        src="/image/baseball_divider_icon.png"
        alt="divider"
        className="w-7 object-contain my-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      />
      <MayCalendar />
      <motion.img
        src="/image/baseball_divider_icon.png"
        alt="divider"
        className="w-7 object-contain my-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      />
      <motion.div
        className="text-center text-sm leading-7 text-gray-700 whitespace-pre-line py-5"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="text-lg mb-4">예식 · 식사 안내</div>
        <motion.img
          src="/image/food_image.png"
          alt="food"
          className="w-full object-contain my-5 rounded-md shadow-[0_4px_16px_rgba(0,0,0,0.2)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />
        <ul className="list-disc list-inside text-left inline-block">
          <li>
            예식 시작 30분 전부터 식사 가능합니다.
            <br />
            <span className="ml-5">(오후 2시 30분까지 식사 가능)</span>
          </li>
          <li>식사는 뷔페로 준비되어 있습니다.</li>
          <li>음료 및 주류 제공됩니다.</li>
        </ul>
      </motion.div>
      <motion.img
        src="/image/baseball_divider_icon.png"
        alt="divider"
        className="w-7 object-contain my-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      />
      <motion.div
        className="text-center text-sm leading-7 text-gray-700 whitespace-pre-line py-5"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="text-lg mb-4">마음 전하실 곳</div>
        <p>
          참석이 어려우시더라도 축복해주시는 마음은
          <br /> 잊지 않고 감사히 간직하겠습니다.
          <br /> 진심으로 감사드립니다.
        </p>
        <div className="flex gap-3 mt-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setGiftModal('groom')}
            className="px-5 py-2.5 rounded-2xl text-sm font-semibold text-white cursor-pointer border-none outline-none shadow-[0_2px_10px_rgba(34,140,205,0.25)] groom-bg flex items-center gap-1.5"
          >
            신랑측 <HeartFillIcon className="text-sky-200" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setGiftModal('bride')}
            className="px-5 py-2.5 rounded-2xl text-sm font-semibold text-white cursor-pointer border-none outline-none shadow-[0_2px_10px_rgba(142,34,23,0.2)] bride-bg flex items-center gap-1.5"
          >
            신부측 <HeartFillIcon className="text-rose-200" />
          </motion.button>
        </div>
      </motion.div>
      <GiftAccountModal
        isOpen={giftModal === 'groom'}
        onClose={() => setGiftModal(null)}
        side="groom"
      />
      <GiftAccountModal
        isOpen={giftModal === 'bride'}
        onClose={() => setGiftModal(null)}
        side="bride"
      />
    </div>
  )
}
