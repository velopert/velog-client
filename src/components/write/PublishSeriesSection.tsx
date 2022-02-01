import * as React from 'react';
import styled from 'styled-components';
import PublishSection from './PublishSection';
import { AddListIcon } from '../../static/svg';
import { themedPalette } from '../../lib/styles/themes';
import palette from '../../lib/styles/palette';
import { MdSettings } from 'react-icons/md';
import { ellipsis } from '../../lib/styles/utils';

const PublishSeriesSectionBlock = styled(PublishSection)``;
const SeriesButton = styled.button`
  background: ${themedPalette.bg_element7};
  height: 3rem;
  width: 100%;
  border-radius: 4px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.05);
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${themedPalette.primary2};
  font-size: 1.125rem;
  font-weight: bold;
  cursor: pointer;
  svg {
    margin-right: 0.875rem;
  }
  &:hover {
    opacity: 0.7;
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
    background: ${themedPalette.bg_element1};
    font-size: 1.125rem;
    line-height: 1;
    color: ${themedPalette.text2};
    flex: 1;
  }
  .name {
    ${ellipsis}
  }
  button {
    outline: none;
    color: white;
    background: ${themedPalette.primary1};
    font-size: 1.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    border: none;
    cursor: pointer;
    &:hover {
      background: ${themedPalette.primary2};
    }
    &:active {
      background: ${themedPalette.primary1};
    }
  }
`;

const RemoveFromSeries = styled.div`
  margin-top: 8px;
  display: flex;
  justify-content: flex-end;
  button {
    outline: none;
    border: none;
    background: none;
    font-size: 1rem;
    color: ${palette.red5};
    padding: 0;
    &:hover {
      color: ${palette.red6};
      text-decoration: underline;
    }
    cursor: pointer;
  }
`;

export interface PublishSeriesSectionProps {
  onEdit: () => void;
  onReset: () => void;
  selected: {
    id: string;
    name: string;
  } | null;
}

const PublishSeriesSection: React.FC<PublishSeriesSectionProps> = ({
  onEdit,
  onReset,
  selected,
}) => {
  return (
    <PublishSeriesSectionBlock title="시리즈 설정">
      {selected ? (
        <>
          <EditSeries>
            <div className="name-wrapper">
              <div className="name">{selected.name}</div>
            </div>
            <button onClick={onEdit} data-testid="setting-button">
              <MdSettings />
            </button>
          </EditSeries>
          <RemoveFromSeries>
            <button onClick={onReset}>시리즈에서 제거</button>
          </RemoveFromSeries>
        </>
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
