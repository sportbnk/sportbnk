
import { useRef, useEffect, useState } from 'react';

interface ResponsiveContainerOptions {
  enableScroll?: boolean;
  minWidth?: number;
}

export function useResponsiveContainer(options: ResponsiveContainerOptions = {}) {
  const { enableScroll = true, minWidth = 768 } = options;
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasHorizontalScroll, setHasHorizontalScroll] = useState(false);
  
  useEffect(() => {
    if (!containerRef.current || !enableScroll) return;
    
    const checkForOverflow = () => {
      const container = containerRef.current;
      if (!container) return;
      
      const hasOverflow = container.scrollWidth > container.clientWidth;
      setHasHorizontalScroll(hasOverflow);
    };
    
    // Initial check
    checkForOverflow();
    
    // Check on resize
    const resizeObserver = new ResizeObserver(checkForOverflow);
    resizeObserver.observe(containerRef.current);
    
    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
      resizeObserver.disconnect();
    };
  }, [enableScroll]);
  
  const containerProps = {
    ref: containerRef,
    className: `${hasHorizontalScroll && enableScroll ? 'overflow-x-auto' : 'overflow-x-hidden'} ${hasHorizontalScroll ? 'has-scroll' : ''}`,
    style: minWidth ? { minWidth: `${minWidth}px` } : undefined,
  };
  
  return {
    containerRef,
    containerProps,
    hasHorizontalScroll
  };
}
