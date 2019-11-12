import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';

export type ToggleSwitchProps = {};

function ToggleSwitch(props: ToggleSwitchProps) {
  return (
    <Block>
      <div className="circle" />
    </Block>
  );
}

const Block = styled.div`
  display: flex;
  align-items: center;
  width: 2.875rem;
  height: 1.5rem;
  background: ${palette.gray2};
  border-radius: 1.125rem;
  padding: 0.125rem;
  .circle {
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 0.625rem;
    background: white;
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.5);
  }
`;

export default ToggleSwitch;
