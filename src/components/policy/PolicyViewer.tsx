import React from 'react';
import data from './policyData';
import MarkdownRender from '../common/MarkdownRender';
import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';

export type PolicyViewerProps = {
  type: 'privacy' | 'terms';
};

function PolicyViewer({ type }: PolicyViewerProps) {
  const title = type === 'privacy' ? '개인정보 취급 방침' : '이용약관';

  return (
    <Block>
      <Helmet>
        <title>{`${title} - velog`}</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <MarkdownRender markdown={data[type]} />
    </Block>
  );
}

const Block = styled.div`
  margin-top: 3rem;
`;

export default PolicyViewer;
