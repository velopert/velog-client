import React from 'react';
import styled, { css } from 'styled-components';
import PublishSection from './PublishSection';
import { themedPalette } from '../../lib/styles/themes';
import palette from '../../lib/styles/palette';
import { ImageVector } from '../../static/svg';
import { ellipsis } from '../../lib/styles/utils';

const PublishPreviewBlock = styled(PublishSection)``;

const ThumbnailSizer = styled.div`
  width: 100%;
  padding-top: 55.11%;
  position: relative;
`;

const ThumbnailBlock = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.03);
`;

const MissingThumbnail = styled.div`
  background: ${themedPalette.bg_element3};
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
`;

const UploadButton = styled.button`
  margin-top: 1rem;
  padding: 0.25rem 2rem;
  background: ${themedPalette.bg_element1};
  border-radius: 4px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.025);
  font-size: 1rem;
  line-height: 1.5;
  color: ${palette.teal5};
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.125s ease-in;
  font-weight: bold;
  &:focus {
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.15);
  }
  &:hover {
    background: ${themedPalette.bg_element2};
  }
`;

const PostInfo = styled.div`
  margin-top: 1.5rem;
  h4 {
    line-height: 1.5;
    margin: 0;
    display: block;
    font-size: 1.125rem;
    ${ellipsis};
  }
`;

const ShortDescriptionTextarea = styled.textarea`
  resize: none;
  width: 100%;
  border: none;
  outline: none;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.03);
  line-height: 1.5;
  font-size: 0.875rem;
  height: 7.375rem;
  padding: 0.75rem 1rem;
  margin-top: 0.5rem;
`;

const TextLimit = styled.div<{ limit: boolean }>`
  text-align: right;
  margin-top: 0.25rem;
  font-size: 0.75rem;
  color: ${themedPalette.text3};
  ${(props) =>
    props.limit &&
    css`
      color: ${palette.red6};
    `}
`;

interface ThumbnailProps {
  thumbnail: string | null;
  onUploadClick: () => void;
}
const Thumbnail: React.FC<ThumbnailProps> = ({ onUploadClick, thumbnail }) => {
  return (
    <ThumbnailSizer>
      <ThumbnailBlock>
        {thumbnail ? (
          <Image src={thumbnail} data-testid="image" />
        ) : (
          <MissingThumbnail>
            <ImageVector />
            <UploadButton onClick={onUploadClick}>썸네일 업로드</UploadButton>
          </MissingThumbnail>
        )}
      </ThumbnailBlock>
    </ThumbnailSizer>
  );
};

const ThumbnailModifyBlock = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 0.5rem;
  & > .actions {
    display: flex;
    align-items: center;
    button {
      background: none;
      outline: none;
      border: none;
      font-size: 1rem;
      color: ${themedPalette.text3};
      cursor: pointer;
      padding: 0;
      text-decoration: underline;
      &:hover {
        color: ${palette.gray5};
      }
      &:active {
        color: ${themedPalette.text2};
      }
    }
    .middledot {
      margin-left: 0.5rem;
      margin-right: 0.5rem;
      display: block;
      width: 2px;
      height: 2px;
      border-radius: 1px;
      background: ${themedPalette.text4};
    }
  }
`;
type ThumbnailModifyProps = {
  visible: boolean;
  onResetThumbnail: () => void;
  onChangeThumbnail: () => void;
};
const ThumbnailModify: React.FC<ThumbnailModifyProps> = ({
  visible,
  onResetThumbnail,
  onChangeThumbnail,
}) => {
  if (!visible) return null;
  return (
    <ThumbnailModifyBlock>
      <div className="actions">
        <button onClick={onChangeThumbnail}>재업로드</button>
        <div className="middledot" />
        <button onClick={onResetThumbnail}>제거</button>
      </div>
    </ThumbnailModifyBlock>
  );
};

const { useCallback } = React;

export interface PublishPreviewProps {
  title: string;
  description: string;
  thumbnail: string | null;
  onChangeDescription: (description: string) => void;
  onResetThumbnail: () => void;
  onUpload: () => any;
}

const PublishPreview: React.FC<PublishPreviewProps> = ({
  title,
  thumbnail,
  description,
  onChangeDescription,
  onUpload,
  onResetThumbnail,
}) => {
  // const descriptionToShow: string = description || defaultDescription;
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChangeDescription(e.target.value);
  };

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.keyCode === 13) {
        e.preventDefault();
      }
    },
    [],
  );
  return (
    <PublishPreviewBlock title="포스트 미리보기">
      <ThumbnailModify
        visible={!!thumbnail}
        onResetThumbnail={onResetThumbnail}
        onChangeThumbnail={onUpload}
      />
      <Thumbnail onUploadClick={onUpload} thumbnail={thumbnail} />
      <PostInfo>
        <h4>{title}</h4>
        <ShortDescriptionTextarea
          placeholder="당신의 포스트를 짧게 소개해보세요."
          value={description}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
        <TextLimit limit={description.length === 150}>
          {description.length}/150
        </TextLimit>
      </PostInfo>
    </PublishPreviewBlock>
  );
};

export default PublishPreview;
