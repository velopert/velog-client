import styled from 'styled-components';
import palette from '../../lib/styles/palette';

const EditRemoveGroup = styled.div`
  button {
    padding: 0;
    outline: none;
    border: none;
    background: none;
    font-size: inherit;
    cursor: pointer;
    color: ${palette.gray6};
    &:hover {
      color: ${palette.gray9};
    }
  }
  button + button {
    margin-left: 0.5rem;
  }
`;

export default EditRemoveGroup;
