import * as React from 'react';
import styled, { css } from 'styled-components';
import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatUnderlined,
  MdFormatStrikethrough,
  MdInsertLink,
  MdFormatQuote,
  MdImage,
  MdCode,
} from 'react-icons/md';
import palette from '../../lib/styles/palette';
import zIndexes from '../../lib/styles/zIndexes';
import { getScrollTop } from '../../lib/utils';

// box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.09);
const ToolbarBlock = styled.div<{ visible: boolean; shadow: boolean }>`
  width: 100%;
  position: sticky;
  top: 0;
  height: 3rem;
  display: flex;
  align-items: center;
  margin-bottom: 3rem;
  position: sticky;
  width: 100%;
  background: white;
  z-index: ${zIndexes.Toolbar};
  transition: all 0.125s ease-in;
  ${props =>
    props.shadow &&
    css`
      box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.09);
    `}
  ${props =>
    !props.visible &&
    css`
      visibility: hidden;
    `};
`;

const TooblarGroup = styled.div`
  display: flex;
  height: 100%;
`;

const Heading = styled.div`
  font-size: 1rem;
  font-weight: bold;
  font-family: serif;
  span {
    font-size: 0.75rem;
  }
`;
const ToolbarItem = styled.button`
  width: 3rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
  color: ${palette.gray6};
  cursor: pointer;
  &:hover {
    color: ${palette.gray9};
    background: ${palette.gray0};
  }
  background: none;
  outline: none;
  border: none;
  padding: 0;

  &.ql-active {
    color: ${palette.teal6};
  }
`;

const Separator = styled.div`
  width: 1px;
  height: 1.25rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  background: ${palette.gray4};
`;
interface ToolbarProps {
  visible: boolean;
}

const { useEffect, useState, useCallback } = React;
const Toolbar: React.SFC<ToolbarProps> = ({ visible }) => {
  const [shadow, setShadow] = useState(false);
  const onScroll = useCallback(
    (e: UIEvent) => {
      console.log(shadow);
      const top = getScrollTop();
      if (top > 80 && !shadow) {
        setShadow(true);
      }
      if (top <= 80 && shadow) {
        setShadow(false);
      }
    },
    [shadow],
  );
  useEffect(() => {
    console.log('reset event listener');
    document.addEventListener('scroll', onScroll);
    return () => {
      document.removeEventListener('scroll', onScroll);
    };
  }, [shadow]);
  return (
    <ToolbarBlock visible={visible} id="toolbar" shadow={shadow}>
      <TooblarGroup>
        <ToolbarItem className="ql-header" value={1}>
          <Heading>
            H<span>1</span>
          </Heading>
        </ToolbarItem>
        <ToolbarItem className="ql-header" value={2}>
          <Heading>
            H<span>2</span>
          </Heading>
        </ToolbarItem>
        <ToolbarItem className="ql-header" value={3}>
          <Heading>
            H<span>3</span>
          </Heading>
        </ToolbarItem>
        <ToolbarItem className="ql-header" value={4}>
          <Heading>
            H<span>4</span>
          </Heading>
        </ToolbarItem>
      </TooblarGroup>
      <Separator />
      <TooblarGroup>
        <ToolbarItem className="ql-bold">
          <MdFormatBold />
        </ToolbarItem>
        <ToolbarItem className="ql-italic">
          <MdFormatItalic />
        </ToolbarItem>
        <ToolbarItem className="ql-underline">
          <MdFormatUnderlined />
        </ToolbarItem>
        <ToolbarItem className="ql-strike">
          <MdFormatStrikethrough />
        </ToolbarItem>
      </TooblarGroup>
      <Separator />
      <TooblarGroup>
        <ToolbarItem className="ql-blockquote">
          <MdFormatQuote />
        </ToolbarItem>
        <ToolbarItem className="ql-link">
          <MdInsertLink />
        </ToolbarItem>
        <ToolbarItem className="ql-image">
          <MdImage />
        </ToolbarItem>
        <ToolbarItem className="ql-code-block">
          <MdCode />
        </ToolbarItem>
      </TooblarGroup>
    </ToolbarBlock>
  );
};

export default Toolbar;
