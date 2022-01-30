import styled, { css } from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';
import { themedPalette } from '../../lib/styles/themes';
import palette from '../../lib/styles/palette';
import { mediaQuery } from '../../lib/styles/media';

const style = css`
  background: transparent;
  display: block;
  padding: 0;
  font-size: 2.75rem;
  ${mediaQuery(767)} {
    font-size: 1.8rem;
  }
  width: 100%;
  resize: none;
  line-height: 1.5;
  outline: none;
  border: none;
  font-weight: bold;
  color: ${themedPalette.text1};
  &::placeholder {
    color: ${themedPalette.text3};
  }
`;

export const TitleTextareaForSSR = styled.textarea`
  ${style}
`;

const TitleTextarea = styled(TextareaAutosize)`
  ${style}
`;

export default TitleTextarea;
