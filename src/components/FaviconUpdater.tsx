
import { useEffect } from 'react';
import { Globe } from 'lucide-react'; // Using Globe from lucide-react

const FaviconUpdater = ({ iconUrl }: { iconUrl?: string }) => {
  useEffect(() => {
    // If a custom icon URL is provided, update the favicon
    if (iconUrl) {
      const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
      if (link) {
        link.href = iconUrl;
      } else {
        const newLink = document.createElement('link');
        newLink.rel = 'icon';
        newLink.href = iconUrl;
        document.head.appendChild(newLink);
      }
    }
  }, [iconUrl]);

  return null; // This component doesn't render anything
};

export default FaviconUpdater;
