import { useDispatch, useSelector } from 'react-redux';
import storage from '../../../lib/storage';
import { RootState } from '../../../modules';
import darkMode from '../../../modules/darkMode';

export function useToggleTheme() {
  const dispatch = useDispatch();
  const darkModeState = useSelector((state: RootState) => state.darkMode);
  const theme = (() => {
    if (darkModeState.systemTheme === 'not-ready') return 'light';
    if (darkModeState.theme !== 'default') return darkModeState.theme;
    return darkModeState.systemTheme;
  })();

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
