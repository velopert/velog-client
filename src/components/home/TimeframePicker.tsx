import React from 'react';
import styled from 'styled-components';
import { themedPalette } from '../../lib/styles/themes';
import palette from '../../lib/styles/palette';
import { useTransition, animated } from 'react-spring';
import OutsideClickHandler from 'react-outside-click-handler';
import { useTimeframe } from './hooks/useTimeframe';
import { timeframes } from './utils/timeframeMap';

export type TimeframePickerProps = {
  visible: boolean;
  onClose: (e: React.MouseEvent<HTMLElement>) => void;
};

function TimeframePicker({ visible, onClose }: TimeframePickerProps) {
  const transition = useTransition(visible, null, {
    from: {
      opacity: 0,
      transform: 'scale(0.8)',
    },
    enter: {
      opacity: 1,
      transform: 'scale(1)',
    },
    leave: {
      opacity: 0,
      transform: 'scale(0.8)',
    },
    config: {
      tension: 350,
      friction: 26,
    },
  });

  const [timeframe, setTimeframe] = useTimeframe();

  return (
    <>
      {transition.map(({ item, key, props }) =>
        item ? (
          <Aligner key={key}>
            <OutsideClickHandler onOutsideClick={onClose} key={key}>
              <Block style={props} onClick={onClose}>
                <ul>
                  {timeframes.map(([value, text]) => (
                    <li
                      key={value}
                      onClick={() => setTimeframe(value)}
                      className={value === timeframe ? 'active' : ''}
                    >
                      {text}
                    </li>
                  ))}
                </ul>
              </Block>
            </OutsideClickHandler>
          </Aligner>
        ) : null,
      )}
    </>
  );
}

const Aligner = styled.div`
  position: absolute;
  right: 0;
  top: 100%;
  z-index: 5;
`;
const Block = styled(animated.div)`
  margin-top: 0.5rem;
  width: 12rem;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.1);
  background: ${themedPalette.bg_element1};
  color: ${themedPalette.text1};
  transform-origin: top right;
  ul {
    list-style: none;
    padding-left: 0;
    margin: 0;
  }
  li {
    cursor: pointer;
    &:hover {
      background: ${themedPalette.bg_element2};
    }
    font-weight: 600;

    font-size: 0.875rem;
    padding: 0.75rem 1rem;

    &.active {
      color: ${themedPalette.primary1};
    }
  }
  li + li {
    border-top: 1px solid ${themedPalette.border4};
  }
  .contact {
    border-top: 1px solid #f1f3f5;
    padding: 1rem;
    h5 {
      margin: 0;
      font-size: 0.75rem;
    }
    .email {
      color: ${themedPalette.text1};
      font-size: 0.75rem;
    }
  }
`;

export default TimeframePicker;
