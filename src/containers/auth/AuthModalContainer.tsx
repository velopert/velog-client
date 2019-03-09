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
import { sendAuthEmail } from '../../lib/api/auth';

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

const { useCallback, useState } = React;
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

  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState<boolean | null>(null);

  const onSendAuthEmail = useCallback(async (email: string) => {
    try {
      setLoading(true);
      const result = await sendAuthEmail(email);
      setLoading(false);
      setRegistered(result.data.registered);
    } catch (e) {
      console.log(e);
    }
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
