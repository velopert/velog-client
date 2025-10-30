import { useEffect } from 'react';
import useUser from './useUser';
import gtag from '../gtag';

const GA_MEASUREMENT_ID = 'G-8D0MD2S4PK';

/**
 * Custom hook to track logged-in users with Google Analytics
 * Sets user_id and user_properties when a user is logged in
 */
const useGoogleAnalyticsUserTracking = () => {
  const currentUser = useUser();

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    // Check if user is logged in and gtag is available
    if (currentUser && currentUser.id) {
      gtag('config', GA_MEASUREMENT_ID, {
        user_id: currentUser.id,
        user_properties: {
          username: currentUser.username,
        },
      });
    }
  }, [currentUser]);
};

export default useGoogleAnalyticsUserTracking;