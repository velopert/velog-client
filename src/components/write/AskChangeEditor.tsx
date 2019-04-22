import * as React from 'react';
import styled from 'styled-components';
import PopupOKCancel from '../common/PopupOKCancel';
import { WriteMode } from '../../modules/write';

const AskChangeEditorBlock = styled.div``;

export interface AskChangeEditorProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  convertTo: WriteMode;
}

const AskChangeEditor: React.FC<AskChangeEditorProps> = ({
  visible,
  onCancel,
  onConfirm,
  convertTo,
}) => {
  if (convertTo === WriteMode.MARKDOWN) {
    return (
      <PopupOKCancel
        visible={visible}
        title="마크다운 에디터로 전환"
        onCancel={onCancel}
        onConfirm={onConfirm}
      >
        에디터 모드를 전환하시겠습니까?
        {/* <br />
        확인을 누르시면 지금까지 입력하신 모든 내용이 마크다운 포맷으료
        변환됩니다.
        <br />
        <br />
        <div style={{ fontSize: '0.875rem' }}>
          <b>주의:</b> 변환 후 코드블록의 언어 타입을 수동으로 입력해주셔야
          합니다.
        </div> */}
      </PopupOKCancel>
    );
  }
  return (
    <PopupOKCancel
      visible={visible}
      title="쉬운 에디터로 전환"
      onCancel={onCancel}
      onConfirm={onConfirm}
    >
      에디터 모드를 전환하시겠습니까?
    </PopupOKCancel>
  );
};

export default AskChangeEditor;
