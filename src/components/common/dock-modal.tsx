import { type ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';

type DockModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
};

export const DockModal = ({ isOpen, onClose, children }: DockModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="dock-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute top-0 -bottom-1 left-0 right-0 inset-0 z-40 backdrop-blur-xl backdrop-saturate-150 bg-white/10 max-w-184"
          onClick={onClose}
        />
      )}
      {isOpen && (
        <motion.div
          key="dock-content"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 26 }}
          className="absolute inset-x-4 top-12 bottom-34 z-40 rounded-3xl overflow-hidden bg-white/30 backdrop-blur-2xl backdrop-saturate-200 border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.5)] max-w-184"
        >
          <div className="flex items-center justify-end px-6 py-5">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="w-6 h-6 flex items-center justify-center rounded-full bg-white/50 backdrop-blur-sm border border-white/30 cursor-pointer text-gray-500 text-sm font-medium"
            >
              <X size={16} />
            </motion.button>
          </div>
          <div className="px-6 pb-6 overflow-y-auto h-[calc(100%-3.5rem)]">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
