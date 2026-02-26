import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

type AccountRow = {
  name: string
  account: string
  bank: string
  isMain?: boolean
  side: 'bride' | 'groom'
}

type GiftAccountModalProps = {
  isOpen: boolean
  onClose: () => void
  side: 'bride' | 'groom'
}

const ACCOUNTS: Record<'bride' | 'groom', AccountRow[]> = {
  groom: [
    {
      name: '신랑 아버지',
      account: '234-567-890001',
      bank: 'A은행',
      side: 'groom',
    },
    {
      name: '신랑 어머니',
      account: '234-567-890002',
      bank: 'A은행',
      side: 'groom',
    },
    {
      name: '송형근',
      account: '234-567-890003',
      bank: 'A은행',
      isMain: true,
      side: 'groom',
    },
  ],
  bride: [
    {
      name: '신부 아버지',
      account: '123-456-789001',
      bank: 'B은행',
      side: 'bride',
    },
    {
      name: '신부 어머니',
      account: '123-456-789002',
      bank: 'B은행',
      side: 'bride',
    },
    {
      name: '김진선',
      account: '110-350-652331',
      bank: '신한',
      isMain: true,
      side: 'bride',
    },
  ],
}

const HeartFillIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    fill="currentColor"
    viewBox="0 0 16 16"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
    />
  </svg>
)

const CopyIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
)

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const AccountItem = ({ row }: { row: AccountRow }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async (): Promise<void> => {
    await navigator.clipboard.writeText(row.account)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const accentClass = row.side === 'bride' ? 'bride' : 'groom'
  const bgClass =
    row.side === 'bride'
      ? 'bg-rose-50/60 border-rose-100'
      : 'bg-sky-50/60 border-sky-100'

  return (
    <div className={`rounded-2xl border px-4 py-3 ${bgClass}`}>
      <div className="flex items-center gap-1.5 mb-2">
        <span className={`text-xs font-semibold ${accentClass}`}>
          {row.name}
        </span>
        {row.isMain && (
          <HeartFillIcon
            className={row.side === 'bride' ? 'text-rose-400' : 'text-sky-400'}
          />
        )}
      </div>
      <div className="flex items-center gap-2">
        <div className="flex-1 bg-white/70 rounded-xl px-3 py-2 flex items-center justify-between border border-white/80">
          <span className="text-xs text-gray-700 font-mono tracking-wide">
            {row.account}
          </span>
          <span className="text-[10px] text-gray-400 ml-2 shrink-0">
            {row.bank}
          </span>
        </div>
        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={handleCopy}
          className={`w-9 h-9 flex items-center justify-center rounded-xl shrink-0 cursor-pointer border transition-colors ${
            copied
              ? 'bg-emerald-100 border-emerald-200 text-emerald-500'
              : row.side === 'bride'
                ? 'bg-rose-100 border-rose-200 text-rose-400'
                : 'bg-sky-100 border-sky-200 text-sky-400'
          }`}
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
        </motion.button>
      </div>
    </div>
  )
}

export const GiftAccountModal = ({
  isOpen,
  onClose,
  side,
}: GiftAccountModalProps) => {
  const accounts = ACCOUNTS[side]
  const title = side === 'bride' ? '신부측 계좌번호' : '신랑측 계좌번호'

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
              <h3
                className={`text-base font-semibold ${side === 'bride' ? 'bride' : 'groom'}`}
              >
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
  )
}
