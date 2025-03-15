
import { useState, useEffect } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    // Check if window is available (client-side)
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }
    // Default to desktop on server-side
    return false;
  });

  useEffect(() => {
    // Only run in browser environment
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(query);
    
    // Initial check
    setMatches(mediaQuery.matches);

    // Create listener function
    const listener = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    // Add the listener
    mediaQuery.addEventListener("change", listener);
    
    // Clean up
    return () => {
      mediaQuery.removeEventListener("change", listener);
    };
  }, [query]);

  return matches;
}

// Common breakpoint helpers
export const breakpoints = {
  sm: '(min-width: 640px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
  xl: '(min-width: 1280px)',
  '2xl': '(min-width: 1536px)',
};

export function useBreakpoint(breakpoint: keyof typeof breakpoints): boolean {
  return useMediaQuery(breakpoints[breakpoint]);
}
