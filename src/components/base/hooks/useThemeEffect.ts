import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../modules';
import darkMode from '../../../modules/darkMode';

export function useThemeEffect() {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.darkMode.theme);

  useEffect(() => {
    const systemPrefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;
    dispatch(
      darkMode.actions.setSystemTheme(systemPrefersDark ? 'dark' : 'light'),
    );
  }, [dispatch]);

  useEffect(() => {
    if (theme !== 'default') {
      document.body.dataset.theme = theme;
    }
  }, [theme]);
}
