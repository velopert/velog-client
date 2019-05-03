import * as React from 'react';
import styled from 'styled-components';
import PublishSection from './PublishSection';
import { AddListIcon } from '../../static/svg';
import palette from '../../lib/styles/palette';

const PublishSeriesSectionBlock = styled(PublishSection)``;
const SeriesButton = styled.button`
  height: 3rem;
  width: 100%;
  border-radius: 4px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.05);
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${palette.teal5};
  font-size: 1.125rem;
  font-weight: bold;
  cursor: pointer;
  svg {
    margin-right: 0.875rem;
  }
  &:hover {
    background: #fdfdfd;
  }
`;
export interface PublishSeriesSectionProps {}

const PublishSeriesSection: React.FC<PublishSeriesSectionProps> = props => {
  return (
    <PublishSeriesSectionBlock title="시리즈 설정">
      <SeriesButton>
        <AddListIcon />
        시리즈에 추가하기
      </SeriesButton>
    </PublishSeriesSectionBlock>
  );
};

export default PublishSeriesSection;
