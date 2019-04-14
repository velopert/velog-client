import * as React from 'react';
import styled from 'styled-components';
import OpaqueLayer from './OpaqueLayer';
import zIndexes from '../../lib/styles/zIndexes';

const PopupBaseBlock = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: ${zIndexes.Popup};
  display: flex;
  align-items: center;
  justify-content: center;
  & > .wrapper {
    width: 25rem;
    background: white;
    padding: 2rem 1.5rem;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.09);
  }
`;

interface PopupBaseProps {
  visible: boolean;
}

const PopupBase: React.SFC<PopupBaseProps> = ({ visible }) => {
  return (
    <>
      <OpaqueLayer visible={visible} />
      <PopupBaseBlock>
        <div className="wrapper">Hey tehre!</div>
      </PopupBaseBlock>
    </>
  );
};

export default PopupBase;
