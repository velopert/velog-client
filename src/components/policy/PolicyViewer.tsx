import React from 'react';
import data from './policyData';
import MarkdownRender from '../common/MarkdownRender';
import styled from 'styled-components';

export type PolicyViewerProps = {
  type: 'privacy' | 'terms';
};

function PolicyViewer({ type }: PolicyViewerProps) {
  return (
    <Block>
      <MarkdownRender markdown={data[type]} />
    </Block>
  );
}

const Block = styled.div`
  margin-top: 3rem;
`;

export default PolicyViewer;
