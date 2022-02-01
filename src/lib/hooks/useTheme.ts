import { useSelector } from 'react-redux';
import { RootState } from '../../modules';

export function useTheme() {
  const darkModeState = useSelector((state: RootState) => state.darkMode);
  const theme = (() => {
    if (darkModeState.systemTheme === 'not-ready') return 'light';
    if (darkModeState.theme !== 'default') return darkModeState.theme;
    return darkModeState.systemTheme;
  })();

  return theme;
}
