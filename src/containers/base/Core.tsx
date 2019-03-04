import * as React from 'react';
import styled from 'styled-components';
import OpaqueLayer from '../../components/common/OpaqueLayer';
import CoreContext from '../../contexts/CoreContext';
import AuthModalContainer from '../auth/AuthModalContainer';

interface CoreProps {}

const { useContext } = React;
const Core: React.SFC<CoreProps> = props => {
  const { state, actions } = useContext(CoreContext);

  return (
    <>
      <OpaqueLayer visible={state.layer} />
      <AuthModalContainer />
    </>
  );
};

export default Core;
