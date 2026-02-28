import { useEffect, useState } from 'react';

export const useNaverMapScript = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (window.naver) {
      setLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=oi5fkbvu7j';
    script.async = true;

    script.onload = () => setLoaded(true);

    document.head.appendChild(script);
  }, []);

  console.log('naver map script loaded:', loaded);

  return loaded;
};
