import React, { FC, useCallback } from 'react';
import AuthModal from '../../components/auth/AuthModal';
import AuthForm from '../../components/auth/AuthForm';
import {
  closeAuthModal,
  AuthMode,
  changeAuthModalMode,
} from '../../modules/core';
import { connect } from 'react-redux';
import { RootState } from '../../modules';
import { sendAuthEmail, SendAuthEmailResponse } from '../../lib/api/auth';
import useRequest from '../../lib/hooks/useRequest';

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

const AuthModalContainer: FC<AuthModalContainerProps> = ({
  visible,
  mode,
  closeAuthModal,
  changeAuthModalMode,
}) => {
  const [_sendAuthEmail, loading, data, error, resetSendAuthEmail] = useRequest<
    SendAuthEmailResponse
  >(sendAuthEmail);

  const onClose = useCallback(() => {
    closeAuthModal();
    resetSendAuthEmail();
  }, []);

  const onToggleMode = useCallback(() => {
    const nextMode = mode === 'REGISTER' ? 'LOGIN' : 'REGISTER';
    changeAuthModalMode(nextMode);
  }, [mode]);

  const registered = data && data.registered;

  const onSendAuthEmail = useCallback(async (email: string) => {
    _sendAuthEmail(email);
  }, []);

  return (
    <AuthModal visible={visible} onClose={onClose}>
      <AuthForm
        mode={mode}
        onToggleMode={onToggleMode}
        onSendAuthEmail={onSendAuthEmail}
        loading={loading}
        registered={registered}
      />
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
