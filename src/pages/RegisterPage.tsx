import React, { FC } from 'react';
import RegisterTemplate from '../components/register/RegisterTemplate';
import RegisterFormContainer from '../containers/register/RegisterFormContainer';

const RegisterPage: FC = () => {
  return (
    <RegisterTemplate>
      <RegisterFormContainer />
    </RegisterTemplate>
  );
};

export default RegisterPage;
