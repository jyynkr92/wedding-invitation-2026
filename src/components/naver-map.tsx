import { useNaverMapScript } from '@/hooks/use-naver-map-script';
import { useEffect, useRef } from 'react';

export default function NaverMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const loaded = useNaverMapScript();

  useEffect(() => {
    if (!loaded || !mapRef.current) return;

    const { naver } = window;
    const center = new naver.maps.LatLng(37.4191398, 126.8832504);
    const map = new naver.maps.Map(mapRef.current, { center, zoom: 15 });

    // 🔴 marker 생성
    new naver.maps.Marker({ position: center, map });
  }, [loaded]);

  return <div ref={mapRef} style={{ width: '100%', height: '300px' }} />;
}
