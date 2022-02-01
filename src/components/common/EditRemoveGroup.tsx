import styled from 'styled-components';
import { themedPalette } from '../../lib/styles/themes';
import palette from '../../lib/styles/palette';

const EditRemoveGroup = styled.div`
  button {
    padding: 0;
    outline: none;
    border: none;
    background: none;
    font-size: inherit;
    cursor: pointer;
    color: ${themedPalette.text3};
    &:hover {
      color: ${themedPalette.text1};
    }
  }
  button + button {
    margin-left: 0.5rem;
  }
`;

export default EditRemoveGroup;
