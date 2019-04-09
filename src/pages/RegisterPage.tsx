import React, { FC } from 'react';
import RegisterTemplate from '../components/register/RegisterTemplate';
import RegisterFormContainer from '../containers/register/RegisterFormContainer';

interface RegisterPageProps {}

const RegisterPage: FC<RegisterPageProps> = props => {
  return (
    <RegisterTemplate>
      <RegisterFormContainer />
    </RegisterTemplate>
  );
};

export default RegisterPage;
