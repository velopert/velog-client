import * as React from 'react';
import RegisterTemplate from '../components/register/RegisterTemplate';
import RegisterFormContainer from '../containers/register/RegisterFormContainer';

interface RegisterPageProps {}

const RegisterPage: React.FC<RegisterPageProps> = () => {
  return (
    <RegisterTemplate>
      <RegisterFormContainer />
    </RegisterTemplate>
  );
};

export default RegisterPage;
