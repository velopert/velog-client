import * as React from 'react';
import styled from 'styled-components';
import AuthModal from '../../components/auth/AuthModal';
import CoreContext from '../../contexts/CoreContext';

interface AuthModalContainerProps {}

const { useContext, useCallback } = React;
const AuthModalContainer: React.SFC<AuthModalContainerProps> = props => {
  const { state, actions } = useContext(CoreContext);
  const onClose = useCallback(() => {
    actions.closeAuthModal();
  }, []);
  const { auth } = state;
  return <AuthModal visible={!!auth} onClose={onClose} />;
};

export default AuthModalContainer;
