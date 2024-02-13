import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { sleep } from '../utils';

const SITE_KEY = '0x4AAAAAAARRng9sFKpsJomI';

const useTurnstile = (isEnabled = true) => {
  const theme = useSelector((state: RootState) => state.darkMode.theme);
  const isTurnstileReady = !!(window as any).isTurnstileReady;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(isTurnstileReady);
  const [isError, setError] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const retryCountRef = useRef<number>(0);

  const waitTurnstileContainer = async () => {
    const container = document.getElementById('cf-turnstile');
    while (!container) {
      if (container) return true;
      await sleep(500);
    }
    return true;
  };

  const checkBot = useCallback(async () => {
    setIsLoading(true);
    const turnstile = (window as any).turnstile;
    await waitTurnstileContainer();
    turnstile.render('#cf-turnstile', {
      sitekey: SITE_KEY,
      theme: theme === 'dark' ? 'dark' : 'light',
      callback: (token: string) => {
        setIsLoading(false);
        setToken(token);
      },
      'error-callback': () => {
        retryCountRef.current += 1;
        setError(true);
        if (retryCountRef.current < 5) {
          setTimeout(() => {
            checkBot();
          }, 1000);
        }
      },
    });
  }, [theme]);

  useEffect(() => {
    const checkTurnstileReady = () => {
      const isTurnstileReady = (window as any).isTurnstileReady;
      setIsReady(isTurnstileReady);
    };
    window.addEventListener('isTurnstileReadyChange', checkTurnstileReady);
    return () => {
      window.removeEventListener('isTurnstileReadyChange', checkTurnstileReady);
    };
  }, []);

  useEffect(() => {
    if (!isEnabled) return;
    checkBot();
  }, [checkBot, isEnabled]);

  return {
    isError,
    isReady,
    isLoading,
    token,
    isEnabled,
  };
};

export default useTurnstile;
