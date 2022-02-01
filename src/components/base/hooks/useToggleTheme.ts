import { useDispatch } from 'react-redux';
import { useTheme } from '../../../lib/hooks/useTheme';
import storage from '../../../lib/storage';
import darkMode from '../../../modules/darkMode';

export function useToggleTheme() {
  const dispatch = useDispatch();
  const theme = useTheme();

  const saveToStorage = (value: 'light' | 'dark') => {
    storage.setItem('theme', value); // For CSR
    // save to cookie
    document.cookie = `theme=${value}; path=/;`; // For SSR
  };

  const toggle = () => {
    if (!theme) return;
    if (theme === 'dark') {
      dispatch(darkMode.actions.enableLightMode());
      saveToStorage('light');
    } else {
      dispatch(darkMode.actions.enableDarkMode());
      saveToStorage('dark');
    }
  };

  return [theme, toggle] as const;
}
