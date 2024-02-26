import * as React from 'react';
import RegisterForm, {
  RegisterFormType,
} from '../../components/register/RegisterForm';
import useRequest from '../../lib/hooks/useRequest';
import {
  getRegisterToken,
  GetRegisterTokenResponse,
  localEmailRegister,
  AuthResponse,
  getSocialProfile,
  SocialProfile,
  socialRegister,
} from '../../lib/api/auth';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import qs from 'qs';
import { useApolloClient } from '@apollo/react-hooks';
import { GET_CURRENT_USER } from '../../lib/graphql/user';

interface RegisterFormContainerProps extends RouteComponentProps<{}> {}

const { useEffect, useState } = React;
const RegisterFormContainer: React.FC<RegisterFormContainerProps> = ({
  location,
  history,
}) => {
  const query: { code?: string; social?: string } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  const client = useApolloClient();
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<null | string>(null);
  const [socialProfile, setSocialProfile] = useState<SocialProfile | null>(
    null,
  );

  const [onGetRegisterToken, , registerToken] =
    useRequest<GetRegisterTokenResponse>((code: string) =>
      getRegisterToken(code),
    );

  const [onLocalRegister] = useRequest<AuthResponse>(localEmailRegister);

  const onGetSocialProfile = async () => {
    const profile = await getSocialProfile();
    setSocialProfile(profile);
  };

  // get register token on mount
  useEffect(() => {
    if (!query.code) {
      // TODO: show error page
      return;
    }
    onGetRegisterToken(query.code);
  }, [onGetRegisterToken, query.code]);

  // get social info on mount
  useEffect(() => {
    if (!query.social) return;
    onGetSocialProfile();
  }, [query.social]);

  const onSubmit = async (form: RegisterFormType) => {
    setError(null);
    // validate
    const validation = {
      displayName: (text: string) => {
        if (text === '') {
          return '이름을 입력해주세요.';
        }
        if (text.length > 45) {
          return '이름은 최대 45자까지 입력 할 수 있습니다.';
        }
      },
      username: (text: string) => {
        if (!/^[a-z0-9-_]{3,16}$/.test(text)) {
          return '아이디는 3~16자의 알파벳 소문자,숫자,혹은 - _ 으로 이루어져야 합니다.';
        }
      },
      shortBio: (text: string) => {
        if (text.length > 140) {
          return `한 줄 소개는 140자 미만으로 입력해주세요. (현재 ${text.length}자)`;
        }
      },
    };

    const error =
      validation.displayName(form.displayName) ||
      validation.username(form.username) ||
      validation.shortBio(form.shortBio) ||
      null;

    if (error) {
      setError(error);
      return;
    }

    try {
      setLoading(true);
      if (query.code) {
        // local email register
        const formWithoutEmail = { ...form } as Partial<RegisterFormType>;
        delete formWithoutEmail.email;
        await onLocalRegister({
          registerToken: registerToken && registerToken.register_token,
          form: formWithoutEmail,
        });
      } else if (query.social) {
        // social register
        await socialRegister({
          displayName: form.displayName,
          shortBio: form.shortBio,
          username: form.username,
        });
      }
    } catch (e) {
      setLoading(false);
      if ((e as any).response.status === 409) {
        setError('이미 존재하는 아이디입니다.');
        return;
      }
      setError('에러 발생!');
      return;
    }

    // check login status and redirect to home
    try {
      await client.query({
        query: GET_CURRENT_USER,
        fetchPolicy: 'network-only',
      });
      history.push('/');
    } catch (e) {
      setError('에러 발생!');
      return;
    }
  };

  if (query.social && !socialProfile) return null;

  return (
    <RegisterForm
      loading={loading}
      onSubmit={onSubmit}
      fixedEmail={
        (registerToken && registerToken.email) ||
        (socialProfile && socialProfile.email)
      }
      error={error}
      defaultInfo={
        socialProfile && {
          displayName: socialProfile.name,
          username: socialProfile.username,
        }
      }
    />
  );
};

export default withRouter(RegisterFormContainer);
