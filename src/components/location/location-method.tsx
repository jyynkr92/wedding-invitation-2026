import { useState } from 'react';
import { CircleParking, Train, Bus } from 'lucide-react';
import Tag from './tag';
import Tab from './tab';
import { motion } from 'motion/react';

export type LocationMethodType = 'parking' | 'subway' | 'bus';

const LocationMethod = () => {
  const [active, setActive] = useState<LocationMethodType>('parking');

  const tags = {
    parking: {
      title: '주차장',
      icon: <CircleParking size={16} />,
    },
    subway: {
      title: '지하철/KTX',
      icon: <Train size={16} />,
    },
    bus: {
      title: '버스',
      icon: <Bus size={16} />,
    },
  } as const;

  return (
    <motion.div
      className="w-full max-w-3xl mt-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <div className="flex items-center gap-3 justify-center mb-2">
        {Object.entries(tags).map(([key, { title, icon }]) => (
          <Tab
            key={key}
            id={key as LocationMethodType}
            label={title}
            icon={icon}
            active={active}
            setActive={setActive}
          />
        ))}
      </div>
      <div className="bg-white/80 p-4 rounded-lg shadow-sm text-sm text-gray-800">
        {active === 'parking' && (
          <div className="space-y-3">
            <ul className="list-disc list-inside space-y-2">
              <li>
                테이크호텔 또는 테이크호텔 주차장 검색
                <div className="ml-5 text-[#005493] font-bold">주소 : 경기도 광명시 신기로 22</div>
              </li>
              <li>
                호텔 엘리베이터 이용이 편리한 주차구역
                <div className="ml-5 flex flex-wrap gap-2 mt-2">
                  <Tag>지하3층 HO구역</Tag>
                  <Tag>지하4층 LB구역 16, 20-24</Tag>
                  <Tag>지하5층 HO구역 01-04</Tag>
                  <Tag>지하5층 LB구역 13, 19, 22</Tag>
                  <Tag>지하5층 U구역 01-02</Tag>
                </div>
              </li>
              <li>3,000여대 주차 가능 (3시간 무료)</li>
            </ul>
          </div>
        )}

        {active === 'subway' && (
          <div className="space-y-3">
            <ul className="list-disc list-inside space-y-2">
              <li className="marker:mr-1">
                <span className="text-indigo-600 font-bold">1호선</span>
                <span className="ml-2">광명역(1호선 KTX 광명행) ①번 출구 (도보 5분)</span>
              </li>
              <li>KTX 광명역 ①번 출구 (도보 5분)</li>
            </ul>
          </div>
        )}

        {active === 'bus' && (
          <div className="space-y-3">
            <ul className="list-disc list-inside space-y-3">
              <li>정류장 이름 : KTX 광명역, 광명데시앙, 일직동 행정복지센터</li>
              <li>
                <Tag>KTX 광명역 셔틀버스</Tag>
                <div className="ml-6 mt-1">
                  8507 (사당역 4번출구↔서울대입구역 2번출구↔KTX 광명역)
                </div>
              </li>
              <li>
                <Tag>공항버스</Tag>
                <div className="ml-6 mt-1">6004, 6014</div>
              </li>
              <li>
                <Tag>일반버스</Tag>
                <div className="ml-6 mt-1">3, 8-2, 11-3, 12, 17, 22, 50, 75, 102</div>
              </li>
              <li>
                <Tag>지선버스</Tag>
                <div className="ml-6 mt-1">5627, 5633</div>
              </li>
              <li>
                <Tag>직행버스</Tag>
                <div className="ml-6 mt-1">3001, 3002, 8507, G9633, G8808</div>
              </li>
              <li>
                <Tag>마을버스</Tag>
                <div className="ml-6 mt-1">1-1, 1-3</div>
              </li>
            </ul>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default LocationMethod;
