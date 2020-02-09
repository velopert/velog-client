import * as React from 'react';
import styled, { css } from 'styled-components';
import PublishSection from './PublishSection';
import palette from '../../lib/styles/palette';
import { GlobeIcon, LockIcon } from '../../static/svg';

const PublishPrivacySettingBlock = styled(PublishSection)`
  outline: none;
  border: none;
  .contents {
    display: flex;
  }
`;

const Button = styled.button<{ active: boolean }>`
  outline: none;
  border: none;
  flex: 1;
  height: 3rem;
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  font-weight: bold;
  font-size: 1.125rem;
  color: ${palette.gray6};
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.05);
  padding: 0;
  padding-left: 1rem;
  border-radius: 4px;
  cursor: pointer;
  border: solid 1px transparent;
  &:hover {
    background: #fdfdfd;
  }
  ${props =>
    props.active &&
    css`
      border: solid 1px ${palette.teal5};
      color: ${palette.teal5};
    `}

  svg {
    margin-right: 1.5rem;
  }
  & + & {
    margin-left: 1rem;
  }
`;

export interface PublishPrivacySettingProps {
  isPrivate: boolean;
  onSelect: (value: boolean) => any;
}

const { useCallback } = React;

const PublishPrivacySetting: React.FC<PublishPrivacySettingProps> = ({
  isPrivate,
  onSelect,
}) => {
  const onClickPrivate = useCallback(() => {
    onSelect(true);
  }, [onSelect]);
  const onClickPublic = useCallback(() => {
    onSelect(false);
  }, [onSelect]);
  return (
    <PublishPrivacySettingBlock title="공개 설정">
      <Button active={!isPrivate} onClick={onClickPublic}>
        <GlobeIcon />
        전체 공개
      </Button>
      <Button active={isPrivate} onClick={onClickPrivate}>
        <LockIcon />
        비공개
      </Button>
    </PublishPrivacySettingBlock>
  );
};

export default PublishPrivacySetting;
