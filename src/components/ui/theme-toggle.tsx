import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar';

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();
  const { open } = useSidebar();

  return (
    <div className={`flex items-center ${className}`}>
      {open && (
        <span className="text-xs font-medium text-muted-foreground mr-2">
          Theme
        </span>
      )}
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleTheme}
        className={`h-8 px-2 hover:bg-muted transition-all duration-200 ${
          !open ? 'w-8 justify-center' : 'w-auto'
        }`}
        title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      >
        <div className="relative w-10 h-5 bg-muted rounded-full p-0.5 transition-colors duration-300">
          <div
            className={`w-4 h-4 bg-background rounded-full shadow-sm transition-transform duration-300 flex items-center justify-center ${
              theme === 'dark' ? 'translate-x-5' : 'translate-x-0'
            }`}
          >
            {theme === 'light' ? (
              <Sun className="h-2.5 w-2.5 text-yellow-500" />
            ) : (
              <Moon className="h-2.5 w-2.5 text-blue-400" />
            )}
          </div>
        </div>
        {open && (
          <span className="ml-2 text-sm font-medium">
            {theme === 'light' ? 'Light' : 'Dark'}
          </span>
        )}
      </Button>
    </div>
  );
};