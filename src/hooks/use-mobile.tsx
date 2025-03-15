
import * as React from "react"
import { useMediaQuery } from "./use-media-query"

// DeviceType defines different device categories
export type DeviceType = 'mobile' | 'tablet' | 'desktop' | 'unknown';

// Use this hook to check if current device is mobile
export function useIsMobile() {
  const matches = useMediaQuery("(max-width: 767px)");
  return matches;
}

// Use this hook to check if current device is tablet
export function useIsTablet() {
  const matches = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
  return matches;
}

// This hook gives you the current device type
export function useDeviceType(): DeviceType {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
  
  if (isMobile) return 'mobile';
  if (isTablet) return 'tablet';
  return 'desktop';
}

// Get screen orientation
export function useOrientation(): 'portrait' | 'landscape' {
  const [orientation, setOrientation] = React.useState<'portrait' | 'landscape'>(
    typeof window !== 'undefined' 
      ? window.innerWidth > window.innerHeight ? 'landscape' : 'portrait'
      : 'portrait'
  );

  React.useEffect(() => {
    const handleResize = () => {
      setOrientation(window.innerWidth > window.innerHeight ? 'landscape' : 'portrait');
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return orientation;
}
