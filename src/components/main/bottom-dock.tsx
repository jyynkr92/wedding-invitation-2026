import { useState } from 'react';
import { motion } from 'motion/react';
import { useDeviceType } from '../../hooks/use-device-type';
import { DockModal } from '../common/dock-modal';
import { IntroContent } from '../information/intro-content';
import LocationContent from '../location/location-content';
import GalleryContent from '../gallery/gallery-content';
import MessageContent from '../message/message-content';

type DockItem = {
  label: string;
  icon: string;
  className?: string;
  textColor: string;
};

export const BottomDock = () => {
  const deviceType = useDeviceType();
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const handleOpen = (label: string) => {
    setActiveModal(label);
  };

  const handleClose = () => {
    setActiveModal(null);
  };

  const calendarIcon =
    deviceType === 'android' ? '/image/calendar-android.png' : '/image/calendar-ios.png';

  const dockItems: DockItem[] = [
    {
      label: '소개',
      icon: calendarIcon,
      className: deviceType === 'android' ? '' : 'shadow-[3px_3px_6px_rgba(0,0,0,0.15)] rounded-md',
      textColor: 'text-gray-800',
    },
    { label: '지도', icon: '/image/location.png', textColor: 'text-gray-800' },
    {
      label: '홈',
      icon: '/image/heart.png',
      className: 'text-white',
      textColor: 'text-white',
    },
    {
      label: '갤러리',
      icon: '/image/gallery.png',
      className: 'text-white',
      textColor: 'text-white',
    },
    {
      label: '메시지',
      icon: '/image/chat.png',
      className: 'text-white',
      textColor: 'text-white',
    },
  ];

  return (
    <>
      <DockModal isOpen={activeModal === '소개'} onClose={handleClose}>
        <IntroContent />
      </DockModal>
      <DockModal isOpen={activeModal === '지도'} onClose={handleClose}>
        <LocationContent />
      </DockModal>
      <DockModal isOpen={activeModal === '갤러리'} onClose={handleClose}>
        <GalleryContent />
      </DockModal>
      <DockModal isOpen={activeModal === '메시지'} onClose={handleClose}>
        <MessageContent />
      </DockModal>
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 max-w-140"
      >
        <div className="flex items-center justify-between gap-2 px-5 py-3 w-screen max-w-140">
          {dockItems.map((item) => (
            <motion.button
              key={item.label}
              whileHover={{ scale: 1.15, y: -4 }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              className="flex pretendard flex-col items-center justify-center  gap-1 cursor-pointer border-none outline-none"
              onClick={() => (item.label === '홈' ? handleClose() : handleOpen(item.label))}
            >
              <div className="flex items-center justify-center rounded-xl bg-white/30 shadow-[0_2px_8px_rgba(0,0,0,0.06)] w-14 h-14">
                <img
                  src={item.icon}
                  alt={item.label}
                  className={`object-contain ${item.className || ''} w-10 h-10`}
                />
              </div>
              <span className={`text-[10px] font-medium leading-none ${item.textColor || ''}`}>
                {item.label}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </>
  );
};
