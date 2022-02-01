import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { LockIcon } from '../../static/svg';

export type PrivatePostLabelProps = {};

function PrivatePostLabel(props: PrivatePostLabelProps) {
  return (
    <Block>
      <LockIcon /> 비공개
    </Block>
  );
}

const Block = styled.div`
  background: ${palette.gray8};
  color: white;
  line-height: 1;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  border-radius: 4px;
  font-weight: bold;
  font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Apple SD Gothic Neo', arial, 나눔고딕, 'Nanum Gothic', 돋움, Dotum, Tahoma,
    Geneva, sans-serif;
  display: inline-flex;
  align-items: center;
  svg {
    margin-right: 0.5rem;
    width: 0.875rem;
    height: 0.875rem;
  }
`;

export default PrivatePostLabel;
