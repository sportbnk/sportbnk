
import { useEffect } from 'react';

const FaviconUpdater = ({ iconUrl }: { iconUrl?: string }) => {
  useEffect(() => {
    // If a custom icon URL is provided, update the favicon
    if (iconUrl) {
      // First try to find existing favicon link
      const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
      if (link) {
        // Update existing favicon
        link.href = iconUrl;
        link.type = "image/png"; // Set correct type for PNG image
      } else {
        // Create new favicon link if none exists
        const newLink = document.createElement('link');
        newLink.rel = 'icon';
        newLink.type = 'image/png';
        newLink.href = iconUrl;
        document.head.appendChild(newLink);
      }
      
      // Also update the document title element to match the icon
      document.title = "SportsBnk";
    }
  }, [iconUrl]);

  return null; // This component doesn't render anything
};

export default FaviconUpdater;
