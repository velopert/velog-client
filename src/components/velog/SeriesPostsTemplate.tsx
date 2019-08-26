import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';

const SeriesPostsTemplateBlock = styled.div`
  & > label {
    display: inline-flex;
    border-bottom: 4px solid ${palette.teal5};
    font-size: 1.125rem;
    font-weight: bold;
    color: ${palette.teal5};
    line-height: 1.5;
  }
  h1 {
    letter-spacing: -0.02em;
    font-family: 'Spoqa Han Sans', -apple-system, BlinkMacSystemFont,
      -apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Apple SD Gothic Neo',
      arial, 나눔고딕, 'Nanum Gothic', 돋움;
    margin-top: 1rem;
    line-height: 1.5;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid ${palette.gray3};
    font-size: 2.5rem;
    color: ${palette.gray9};
  }
`;

export interface SeriesPostsTemplateProps {
  name: string;
}

const SeriesPostsTemplate: React.FC<SeriesPostsTemplateProps> = ({
  children,
  name,
}) => {
  return (
    <SeriesPostsTemplateBlock>
      <label>시리즈</label>
      <h1>{name}</h1>
      <section>{children}</section>
    </SeriesPostsTemplateBlock>
  );
};

export default SeriesPostsTemplate;
