
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
