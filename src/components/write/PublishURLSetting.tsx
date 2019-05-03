import * as React from 'react';
import styled from 'styled-components';
import PublishSection from './PublishSection';
import palette from '../../lib/styles/palette';

const PublishURLSettingBlock = styled(PublishSection)``;
const URLTextBlock = styled.div`
  display: flex;
  background: white;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.03);
  padding: 0.5rem 0.875rem;
  line-height: 1.5;
  .username {
    color: ${palette.gray6};
  }
`;
const Input = styled.input`
  font-size: 1rem;
  background: none;
  outline: none;
  flex: 1;
  border: none;
  padding: 0;
  line-height: 1.5;
  color: ${palette.gray8};
`;

export interface PublishURLSettingProps {
  username: string;
  urlSlug: string;
  onChangeUrlSlug: (urlSlug: string) => void;
}

const PublishURLSetting: React.FC<PublishURLSettingProps> = ({
  username,
  urlSlug,
  onChangeUrlSlug,
}) => {
  const onChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => onChangeUrlSlug(e.target.value),
    [onChangeUrlSlug],
  );
  return (
    <PublishURLSettingBlock title="URL 설정">
      <URLTextBlock>
        <div className="username">/@{username}/</div>
        <Input value={urlSlug} onChange={onChange} />
      </URLTextBlock>
    </PublishURLSettingBlock>
  );
};

export default PublishURLSetting;
