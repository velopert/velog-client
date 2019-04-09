import React, { FC } from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';

const TagBlock = styled.div`
  display: inline-flex;
  height: 1.5rem;
  border-radius: 0.75rem;
  background: ${palette.gray1};
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  align-items: center;
  font-size: 0.75rem;
  color: ${palette.gray7};
  & + & {
    margin-left: 0.5rem;
  }
`;

interface TagProps {}

const Tag: FC<TagProps> = ({ children }) => {
  return <TagBlock>{children}</TagBlock>;
};

export default Tag;
