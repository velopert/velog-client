import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { themedPalette } from '../../lib/styles/themes';
import palette from '../../lib/styles/palette';
import SkeletonTexts from '../common/SkeletonTexts';

const SeriesPostsTemplateBlock = styled.div`
  & > label {
    display: inline-flex;
    border-bottom: 4px solid ${themedPalette.primary2};
    font-size: 1.125rem;
    font-weight: bold;
    color: ${themedPalette.primary2};
    line-height: 1.5;
  }
  h1 {
    letter-spacing: -0.004em;
    /* font-family: 'Spoqa Han Sans', -apple-system, BlinkMacSystemFont,
      -apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Apple SD Gothic Neo',
      arial, 나눔고딕, 'Nanum Gothic', 돋움; */
    margin-top: 1rem;
    line-height: 1.5;
    margin-bottom: 1.5rem;
    font-size: 2.5rem;
    color: ${themedPalette.text1};
    outline: none;
  }
`;

const Separator = styled.div`
  background: ${themedPalette.bg_element4};
  height: 1px;
  width: 100%;
  margin-bottom: 1.5rem;
`;

export interface SeriesPostsTemplateProps {
  name: string;
  nextName: string;
  editing: boolean;
  onInput: (e: React.FormEvent<HTMLHeadingElement>) => void;
}

const SeriesPostsTemplate: React.FC<SeriesPostsTemplateProps> = ({
  children,
  editing,
  name,
  onInput,
}) => {
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    if (!editing || !titleRef.current) return;
    titleRef.current.focus();
  }, [editing]);
  return (
    <SeriesPostsTemplateBlock>
      <label>시리즈</label>
      <h1
        contentEditable={editing}
        ref={titleRef}
        onInput={onInput}
        suppressContentEditableWarning={true}
      >
        {name}
      </h1>
      <Separator />
      <section>{children}</section>
    </SeriesPostsTemplateBlock>
  );
};

export type SeriesPostsTemplateSkeletonProps = {
  children: React.ReactNode;
};

export function SeriesPostsTemplateSkeleton({
  children,
}: SeriesPostsTemplateSkeletonProps) {
  return (
    <SkeletonBlock>
      <label>시리즈</label>
      <h1>
        <SkeletonTexts wordLengths={[5, 3, 4]} />
      </h1>
      <Separator />
      <section>{children}</section>
    </SkeletonBlock>
  );
}

const SkeletonBlock = styled(SeriesPostsTemplateBlock)`
  h1 {
    padding-right: 4rem;
    display: flex;
    height: 3.75rem;
    align-items: center;
  }
`;

export default SeriesPostsTemplate;
