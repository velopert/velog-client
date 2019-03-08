import * as React from 'react';
import styled from 'styled-components';
import AuthModal from '../../components/auth/AuthModal';
import AuthForm from '../../components/auth/AuthForm';
import {
  closeAuthModal,
  AuthMode,
  changeAuthModalMode,
} from '../../modules/core';
import { connect } from 'react-redux';
import { RootState } from '../../modules';

interface OwnProps {}
interface StateProps {
  visible: boolean;
  mode: AuthMode;
}
interface DispatchProps {
  closeAuthModal: typeof closeAuthModal;
  changeAuthModalMode: typeof changeAuthModalMode;
}
type AuthModalContainerProps = OwnProps & StateProps & DispatchProps;

const { useCallback } = React;
const AuthModalContainer: React.SFC<AuthModalContainerProps> = ({
  visible,
  mode,
  closeAuthModal,
  changeAuthModalMode,
}) => {
  const onClose = useCallback(() => {
    closeAuthModal();
  }, []);
  const onToggleMode = useCallback(() => {
    const nextMode = mode === 'REGISTER' ? 'LOGIN' : 'REGISTER';
    changeAuthModalMode(nextMode);
  }, [mode]);
  return (
    <AuthModal visible={visible} onClose={onClose}>
      <AuthForm mode={mode} onToggleMode={onToggleMode} />
    </AuthModal>
  );
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  state => ({
    visible: state.core.auth.visible,
    mode: state.core.auth.mode,
  }),
  { closeAuthModal, changeAuthModalMode },
)(AuthModalContainer);
