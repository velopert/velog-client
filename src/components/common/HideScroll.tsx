import * as React from 'react';

export interface HideScrollProps {}

const { useEffect } = React;

/**
 * Hides body scrollbar on mount
 * Revert on unmount
 */
const HideScroll: React.FC<HideScrollProps> = props => {
  useEffect(() => {
    const prevStyles = getComputedStyle(window.document.body);
    window.document.body.style.overflowX = 'hidden';
    window.document.body.style.overflowY = 'hidden';
    return () => {
      window.document.body.style.overflowX = prevStyles.overflowX;
      window.document.body.style.overflowY = prevStyles.overflowY;
    };
  }, []);
  return null;
};

export default HideScroll;
