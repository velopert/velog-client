import * as React from 'react';
import styled from 'styled-components';
import PopupOKCancel from '../common/PopupOKCancel';

const AskChangeEditorBlock = styled.div``;

interface AskChangeEditorProps {
  visible: boolean;
}

const AskChangeEditor: React.FC<AskChangeEditorProps> = ({ visible }) => {
  return (
    <PopupOKCancel visible={visible} title="마크다운 에디터로 전환">
      에디터 모드를 전환하시겠습니까?
      <br />
      확인을 누르시면 지금까지 입력하신 모든 내용이 마크다운 포맷으료
      변환됩니다.
    </PopupOKCancel>
  );
};

export default AskChangeEditor;
