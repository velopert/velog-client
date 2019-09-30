import * as React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';

const TagBlock = styled.div`
  display: inline-flex;
  height: 1.75rem;
  border-radius: 0.875rem;
  background: ${palette.gray1};
  padding-left: 0.875rem;
  padding-right: 0.875rem;
  align-items: center;
  font-size: 0.875rem;
  color: ${palette.gray7};
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
`;

interface TagProps {}

const Tag: React.FC<TagProps> = ({ children }) => {
  return <TagBlock>{children}</TagBlock>;
};

export default Tag;
