import * as React from 'react';
import RegisterTemplate from '../components/register/RegisterTemplate';
import RegisterFormContainer from '../containers/register/RegisterFormContainer';
import { Helmet } from 'react-helmet-async';

interface RegisterPageProps {}

const RegisterPage: React.FC<RegisterPageProps> = () => {
  return (
    <RegisterTemplate>
      <Helmet>
        <title>회원가입 - velog</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <RegisterFormContainer />
    </RegisterTemplate>
  );
};

export default RegisterPage;
