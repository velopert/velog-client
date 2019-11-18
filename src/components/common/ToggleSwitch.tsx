import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';
import { useSpring, animated } from 'react-spring';
import useMounted from '../../lib/hooks/useMounted';

export type ToggleSwitchProps = {
  name?: string;
  value: boolean;
  onChange: (params: { name: string; value: boolean }) => void;
};

function ToggleSwitch({ value, name, onChange }: ToggleSwitchProps) {
  const [localValue, setLocalValue] = useState(value);
  const mounted = useMounted();

  const style = useSpring({
    transform: localValue ? 'translate(1.375rem)' : 'translate(0rem)',
    boxShadow: localValue
      ? '-2px 0 4px rgba(0, 0, 0, 0.1)'
      : '2px 0 4px rgba(0, 0, 0, 0.05)',
    config: {
      tension: 200,
      friction: 12,
      clamp: true,
    },
  });

  const toggle = () => {
    setLocalValue(v => !v);
  };

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    if (!mounted.current) return;
    onChange({
      name: name || '',
      value: localValue,
    });
  }, [localValue, mounted, name, onChange]);

  return (
    <Block active={localValue} onClick={toggle}>
      <animated.div className="circle" style={style} />
    </Block>
  );
}

const Block = styled.div<{ active: boolean }>`
  cursor: pointer;
  display: flex;
  align-items: center;
  width: 2.875rem;
  height: 1.5rem;
  background: ${palette.gray2};
  transition: 0.125s all ease-in;
  border-radius: 1.125rem;
  padding: 0.125rem;
  ${props =>
    props.active &&
    css`
      background: ${palette.teal5};
    `}
  .circle {
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 0.625rem;
    background: white;
    box-shadow: 2px 0 4px rgba(0, 0, 0, 0.05);
  }
`;

export default ToggleSwitch;
