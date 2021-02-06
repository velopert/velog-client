import * as React from 'react';
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
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

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
const AuthModalContainer: React.FC<AuthModalContainerProps> = ({
  visible,
  mode,
  closeAuthModal,
  changeAuthModalMode,
}) => {
  const location = useLocation();
  const [_sendAuthEmail, loading, data, , resetSendAuthEmail] = useRequest<
    SendAuthEmailResponse
  >(sendAuthEmail);

  const onClose = useCallback(() => {
    closeAuthModal();
    resetSendAuthEmail();
  }, [closeAuthModal, resetSendAuthEmail]);

  const onToggleMode = useCallback(() => {
    const nextMode = mode === 'REGISTER' ? 'LOGIN' : 'REGISTER';
    changeAuthModalMode(nextMode);
  }, [changeAuthModalMode, mode]);

  const registered = data && data.registered;

  const onSendAuthEmail = useCallback(
    async (email: string) => {
      if (!validateEmail(email)) {
        toast.error('잘못된 이메일 형식입니다.');
        return;
      }
      _sendAuthEmail(email);
    },
    [_sendAuthEmail],
  );

  return (
    <AuthModal visible={visible} onClose={onClose}>
      <AuthForm
        mode={mode}
        onToggleMode={onToggleMode}
        onSendAuthEmail={onSendAuthEmail}
        loading={loading}
        registered={registered}
        currentPath={`${location.pathname}${location.search}`}
      />
    </AuthModal>
  );
};

function validateEmail(email: string) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  (state) => ({
    visible: state.core.auth.visible,
    mode: state.core.auth.mode,
  }),
  { closeAuthModal, changeAuthModalMode },
)(AuthModalContainer);
