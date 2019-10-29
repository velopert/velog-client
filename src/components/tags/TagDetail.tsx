import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';

export type TagDetailProps = {
  thumbnail: string | null;
  name: string;
  description: string | null;
  count: number;
};

function TagDetail({ thumbnail, name, description, count }: TagDetailProps) {
  return (
    <Block>
      {thumbnail && (
        <img
          src={thumbnail}
          alt={`name ${thumbnail}`}
          className="tag-thumbnail"
        />
      )}
      <h1># {name}</h1>
      {description && <p>{description}</p>}
      <div className="count">총 {count}개의 포스트</div>
    </Block>
  );
}

const Block = styled.div`
  padding-bottom: 4rem;

  .tag-thumbnail {
    width: 12rem;
    height: 12rem;
    display: block;
    border-radius: 6rem;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.125);
    margin-bottom: 2rem;
  }

  h1 {
    font-size: 3rem;
    margin-top: 0;
    margin-bottom: 0.5rem;
    line-height: 1.5;
    color: ${palette.gray8};
  }
  p {
    font-size: 1.125rem;
    line-height: 1.5;
    color: ${palette.gray7};
  }
  .count {
    margin-top: 1rem;
    color: ${palette.gray6};
    font-size: 1rem;
  }
`;

export default TagDetail;
