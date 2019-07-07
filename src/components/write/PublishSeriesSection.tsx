import * as React from 'react';
import styled from 'styled-components';
import PublishSection from './PublishSection';
import { AddListIcon } from '../../static/svg';
import palette from '../../lib/styles/palette';
import { MdSettings } from 'react-icons/md';
import { ellipsis } from '../../lib/styles/utils';

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

const EditSeries = styled.div`
  height: 3rem;
  width: 100%;
  display: flex;
  border-radius: 4px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.05);
  overflow: hidden;
  .name-wrapper {
    min-width: 0;
    display: flex;
    align-items: center;
    padding-left: 1rem;
    padding-right: 1rem;
    background: white;
    font-size: 1.125rem;
    line-height: 1;
    color: ${palette.gray7};
    flex: 1;
  }
  .name {
    ${ellipsis}
  }
  button {
    outline: none;
    color: white;
    background: ${palette.teal6};
    font-size: 1.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    border: none;
    cursor: pointer;
    &:hover {
      background: ${palette.teal5};
    }
    &:active {
      background: ${palette.teal7};
    }
  }
`;

export interface PublishSeriesSectionProps {
  onEdit: () => void;
  selected: {
    id: string;
    name: string;
  } | null;
}

const PublishSeriesSection: React.FC<PublishSeriesSectionProps> = ({
  onEdit,
  selected,
}) => {
  return (
    <PublishSeriesSectionBlock title="시리즈 설정">
      {selected ? (
        <EditSeries>
          <div className="name-wrapper">
            <div className="name">{selected.name}</div>
          </div>
          <button onClick={onEdit} data-testid="setting-button">
            <MdSettings />
          </button>
        </EditSeries>
      ) : (
        <SeriesButton onClick={onEdit}>
          <AddListIcon />
          시리즈에 추가하기
        </SeriesButton>
      )}
    </PublishSeriesSectionBlock>
  );
};

export default PublishSeriesSection;
