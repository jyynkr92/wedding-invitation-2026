import { useState } from 'react'
import type { AccountRow } from './gift-account-modal'
import { motion } from 'motion/react'
import HeartFillIcon from '@/icons/heart-fill-icon'
import CheckIcon from '@/icons/check-icon'
import CopyIcon from '@/icons/copy-icon'

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

export default AccountItem
