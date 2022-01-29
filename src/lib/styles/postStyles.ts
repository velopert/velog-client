import { css } from 'styled-components';
import palette from './palette';
import { themedPalette } from './themes';

const postStyles = css`
  blockquote {
    padding: 1.125rem;
    border-left: 8px solid ${palette.teal6};
    background: ${themedPalette.bg_element2};
    font-size: inherit;
  }
  blockquote + blockquote {
    padding-top: 0px;
  }
`;

export default postStyles;
