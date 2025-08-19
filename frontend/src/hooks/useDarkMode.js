import { useState, useMemo } from 'react';
import { createTheme } from '@mui/material/styles';

const getInitialMode = () => {
  const savedMode = localStorage.getItem('darkMode');
  return savedMode === 'true';
};

export default function useDarkMode() {
  const [darkMode, setDarkMode] = useState(getInitialMode());

  const theme = useMemo(() =>
    createTheme({
      palette: {
        mode: darkMode ? 'dark' : 'light',
        primary: { main: '#1976d2' },
      },
    }), [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      localStorage.setItem('darkMode', !prev);
      return !prev;
    });
  };

  return [theme, toggleDarkMode];
}
