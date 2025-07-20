import { Button } from './Button';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

export function ThemeToggle({ theme, setTheme }: ThemeToggleProps) {
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <Button
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      shape="circle"
      size="large"
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </Button>
  );
}