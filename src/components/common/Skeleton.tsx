import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import palette from '../../lib/styles/palette';

export type SkeletonProps = {
  width?: number | string;
  height?: number | string;
  flex?: number;
  marginRight?: number | string;
  noSpacing?: boolean;
  circle?: boolean;
  className?: string;
};

function Skeleton({
  width,
  height,
  flex,
  marginRight,
  noSpacing,
  circle,
  className,
}: SkeletonProps) {
  return (
    <Block
      style={{ width, height, flex, marginRight }}
      noSpacing={noSpacing || !!marginRight}
      circle={circle}
      className={className}
    />
  );
}

const shining = keyframes`
  0% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.5;
  }
`;

const Block = styled.div<{ noSpacing?: boolean; circle?: boolean }>`
  background: ${palette.gray1};
  animation: ${shining} 1s ease-in-out infinite;
  display: inline-block;
  border-radius: 4px;
  height: 1em;

  ${props =>
    !props.noSpacing &&
    css`
      & + & {
        margin-left: 0.5rem;
      }
    `}

  ${props =>
    props.circle &&
    css`
      border-radius: 50%;
    `}
`;

export default Skeleton;
