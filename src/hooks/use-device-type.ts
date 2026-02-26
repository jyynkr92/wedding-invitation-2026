import { useMemo } from 'react'

type DeviceType = 'ios' | 'android' | 'other'

export const useDeviceType = (): DeviceType => {
  return useMemo(() => {
    const ua = navigator.userAgent || navigator.vendor || ''

    if (/iPad|iPhone|iPod|Macintosh/.test(ua) && 'ontouchend' in document) {
      return 'ios'
    }

    if (/android/i.test(ua)) {
      return 'android'
    }

    return 'other'
  }, [])
}
