import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';

const PublishSeriesCreateBlock = styled.div`
  background: ${palette.gray2};
  padding: 1rem;
`;

const Input = styled.input`
  height: 2rem;
  width: 100%;
  padding: 0.5rem;
  font-size: 0.875rem;
  border-radius: 2px;
  border: none;
  outline: none;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.03);
  &::placeholder {
    color: ${palette.gray5};
  }
`;

export interface PublishSeriesCreateProps {}

const PublishSeriesCreate: React.FC<PublishSeriesCreateProps> = props => {
  return (
    <PublishSeriesCreateBlock>
      <Input placeholder="새로운 시리즈를 입력하세요" />
    </PublishSeriesCreateBlock>
  );
};

export default PublishSeriesCreate;
