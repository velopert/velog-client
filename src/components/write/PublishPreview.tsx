import * as React from 'react';
import styled, { css } from 'styled-components';
import PublishSection from './PublishSection';
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
  background: ${palette.gray2};
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const UploadButton = styled.button`
  margin-top: 1rem;
  padding: 0.25rem 2rem;
  background: white;
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
    background: ${palette.gray0};
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
  color: ${palette.gray6};
  ${props =>
    props.limit &&
    css`
      color: ${palette.red6};
    `}
`;

export interface PublishPreviewProps {
  title: string;
  description: string;
  defaultDescription: string;
  onChangeDescription: (description: string) => void;
  onUpload: () => any;
}

interface ThumbnailProps {
  onUploadClick: () => void;
}
const Thumbnail: React.FC<ThumbnailProps> = ({ onUploadClick }) => {
  return (
    <ThumbnailSizer>
      <ThumbnailBlock>
        <MissingThumbnail>
          <ImageVector />
          <UploadButton onClick={onUploadClick}>썸네일 업로드</UploadButton>
        </MissingThumbnail>
      </ThumbnailBlock>
    </ThumbnailSizer>
  );
};

const { useCallback, useEffect } = React;
const PublishPreview: React.FC<PublishPreviewProps> = ({
  title,
  description,
  defaultDescription,
  onChangeDescription,
  onUpload,
}) => {
  const descriptionToShow: string = description || defaultDescription;
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
    <PublishPreviewBlock title="포스트 카드 미리보기">
      <Thumbnail onUploadClick={onUpload} />
      <PostInfo>
        <h4>{title}</h4>
        <ShortDescriptionTextarea
          placeholder="당신의 포스트를 짧게 소개해보세요."
          value={descriptionToShow}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
        <TextLimit
          limit={
            descriptionToShow !== defaultDescription &&
            descriptionToShow.length === 150
          }
        >
          {descriptionToShow.length}/150
        </TextLimit>
      </PostInfo>
    </PublishPreviewBlock>
  );
};

export default PublishPreview;
