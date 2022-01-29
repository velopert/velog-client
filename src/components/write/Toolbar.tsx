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
import { themedPalette } from '../../lib/styles/themes';
import palette from '../../lib/styles/palette';
import zIndexes from '../../lib/styles/zIndexes';
import { mediaQuery } from '../../lib/styles/media';

// box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.09);
const ToolbarBlock = styled.div<{
  shadow: boolean;
  forMarkdown: boolean;
}>`
  width: 100%;
  top: 0;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  width: 100%;
  background: ${themedPalette.bg_element1};
  z-index: ${zIndexes.Toolbar};
  transition: all 0.125s ease-in;
  flex-wrap: wrap;

  ${(props) =>
    props.forMarkdown &&
    css`
      margin-bottom: 1rem;
      padding-left: 3rem;
      padding-right: 3rem;

      ${mediaQuery(767)} {
        padding-left: 1rem;
        padding-right: 1rem;
        flex-wrap: unset;
        overflow-x: auto;
      }
      width: auto;
    `}

  ${(props) =>
    props.shadow &&
    css`
      box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.09);
      margin-bottom: 0;
    `}

  .mobile-placeholder {
    display: none;
    ${mediaQuery(767)} {
      display: block;
    }
    height: 1px;
    width: 1rem;
    flex-shrink: 0;
  }
`;

// const ToolbarGroup = styled.div`
//   display: flex;
//   height: 100%;
// `;

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
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
  color: ${palette.gray6};
  cursor: pointer;
  flex-shrink: 0;

  ${mediaQuery(767)} {
    width: 2.5rem;
    height: 2.5rem;
    font-size: 1.45rem;
  }
  &:hover {
    color: ${themedPalette.text1};
    background: ${themedPalette.bg_element2};
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
  background: ${themedPalette.border3};
`;
export interface ToolbarProps {
  shadow: boolean;
  mode: 'MARKDOWN' | 'WYSIWYG';
  onClick?: Function;
  onConvert?: () => void;
  innerRef?: React.RefObject<HTMLDivElement>;
  ios?: boolean;
}

const Toolbar: React.FC<ToolbarProps> = ({
  shadow,
  mode,
  onClick = () => {},
  onConvert,
  innerRef,
  ios,
}) => {
  const forMarkdown = mode === 'MARKDOWN';
  return (
    <ToolbarBlock
      id="toolbar"
      shadow={shadow}
      forMarkdown={forMarkdown}
      ref={innerRef}
    >
      <ToolbarItem
        className="ql-header"
        value={1}
        onClick={() => onClick('heading1')}
      >
        <Heading>
          H<span>1</span>
        </Heading>
      </ToolbarItem>
      <ToolbarItem
        className="ql-header"
        value={2}
        onClick={() => onClick('heading2')}
      >
        <Heading>
          H<span>2</span>
        </Heading>
      </ToolbarItem>
      <ToolbarItem
        className="ql-header"
        value={3}
        onClick={() => onClick('heading3')}
      >
        <Heading>
          H<span>3</span>
        </Heading>
      </ToolbarItem>
      <ToolbarItem
        className="ql-header"
        value={4}
        onClick={() => onClick('heading4')}
      >
        <Heading>
          H<span>4</span>
        </Heading>
      </ToolbarItem>
      <Separator />
      {!ios && (
        <>
          <ToolbarItem className="ql-bold" onClick={() => onClick('bold')}>
            <MdFormatBold />
          </ToolbarItem>
          <ToolbarItem className="ql-italic" onClick={() => onClick('italic')}>
            <MdFormatItalic />
          </ToolbarItem>
          {!forMarkdown && (
            <ToolbarItem className="ql-underline">
              <MdFormatUnderlined />
            </ToolbarItem>
          )}
          <ToolbarItem className="ql-strike" onClick={() => onClick('strike')}>
            <MdFormatStrikethrough />
          </ToolbarItem>
          <Separator />
          <ToolbarItem
            className="ql-blockquote"
            onClick={() => onClick('blockquote')}
          >
            <MdFormatQuote />
          </ToolbarItem>
          <ToolbarItem className="ql-link" onClick={() => onClick('link')}>
            <MdInsertLink />
          </ToolbarItem>
        </>
      )}
      <ToolbarItem className="ql-image" onClick={() => onClick('image')}>
        <MdImage />
      </ToolbarItem>

      {!ios && (
        <ToolbarItem
          className="ql-code-block"
          onClick={() => onClick('codeblock')}
        >
          <MdCode />
        </ToolbarItem>
      )}
      <div className="mobile-placeholder"></div>
      {/* <Separator /> */}
      {/* <ToolbarGroup> */}
      {/* forMarkdown ? (
          <ToolbarItem data-testid="quillconvert" onClick={onConvert}>
            <MdRemoveRedEye />
          </ToolbarItem>
        ) : (
          <ToolbarItem data-testid="mdconvert" onClick={onConvert}>
            <FaMarkdown />
          </ToolbarItem>
        ) */}
      {/* </ToolbarGroup> */}
    </ToolbarBlock>
  );
};

export default Toolbar;
