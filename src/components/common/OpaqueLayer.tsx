import * as React from 'react';
import styled, { css } from 'styled-components';
import transitions from '../../lib/styles/transitions';

const OpaqueLayerBlock = styled.div<{
  animate: boolean;
  visible: boolean;
}>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(249, 249, 249, 0.85);

  ${props =>
    props.visible &&
    css`
      animation: ${transitions.fadeIn} 0.25s forwards;
    `}
`;

interface OpaqueLayerProps {
  visible: boolean;
}

const { useState, useEffect, useRef } = React;

const OpaqueLayer: React.SFC<OpaqueLayerProps> = ({ visible }) => {
  const [animate, setAnimate] = useState(false);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);
  const mounted = useRef(false);

  // activates animation & hides and unhides scrollbar
  useEffect(() => {
    // scrollbar
    document.body.style.overflowY = visible ? 'hidden' : 'initial';

    // animate
    if (!mounted.current) {
      mounted.current = true;
    } else {
      setAnimate(true);
      timeoutId.current = setTimeout(() => {
        setAnimate(false);
      }, 250);
    }

    return () => {
      if (!timeoutId.current) return;
      clearTimeout(timeoutId.current);
    };
  }, [visible]);

  if (!animate && !visible) return null;

  return <OpaqueLayerBlock animate={animate} visible={visible} />;
};

export default OpaqueLayer;
