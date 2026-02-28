import { AnimatePresence, motion } from 'motion/react';
import AccountItem from './account-item';

export type AccountRow = {
  name: string;
  account: string;
  bank: string;
  isMain?: boolean;
  side: 'bride' | 'groom';
};

type GiftAccountModalProps = {
  isOpen: boolean;
  onClose: () => void;
  side: 'bride' | 'groom';
};

const ACCOUNTS: Record<'bride' | 'groom', AccountRow[]> = {
  groom: [
    {
      name: '송준일',
      account: '609301-04-106740',
      bank: '국민',
      side: 'groom',
    },
    {
      name: '권정숙',
      account: '745011-52-079830',
      bank: '농협',
      side: 'groom',
    },
    {
      name: '송형근',
      account: '070-118746-01-019',
      bank: '기압',
      isMain: true,
      side: 'groom',
    },
  ],
  bride: [
    {
      name: '김영기',
      account: '110-124-307572',
      bank: '신한',
      side: 'bride',
    },
    {
      name: '유영춘',
      account: '640-001532-02-013',
      bank: '농협',
      side: 'bride',
    },
    {
      name: '김진선',
      account: '900-038200-01-011',
      bank: '기업',
      isMain: true,
      side: 'bride',
    },
  ],
};

export const GiftAccountModal = ({ isOpen, onClose, side }: GiftAccountModalProps) => {
  const accounts = ACCOUNTS[side];
  const title = side === 'bride' ? '신부측 계좌번호' : '신랑측 계좌번호';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-60 backdrop-blur-sm bg-black/10"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="fixed inset-x-6 bottom-32 z-60 rounded-3xl overflow-hidden bg-white/60 backdrop-blur-2xl border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
          >
            <div className="flex items-center justify-between px-5 pt-5 pb-3">
              <h3 className={`text-base font-semibold ${side === 'bride' ? 'bride' : 'groom'}`}>
                {title}
              </h3>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="w-7 h-7 flex items-center justify-center rounded-full bg-white/50 border border-white/40 cursor-pointer text-gray-400 text-xs"
              >
                ✕
              </motion.button>
            </div>
            <div className="px-5 pb-6 flex flex-col gap-3">
              {accounts.map((row) => (
                <AccountItem key={row.name} row={row} />
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
