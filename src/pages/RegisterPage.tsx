import React from 'react';
import styled from 'styled-components';
import RegisterTemplate from '../components/register/RegisterTemplate';
import RegisterFormContainer from '../containers/register/RegisterFormContainer';

interface RegisterPageProps {}

const RegisterPage: React.SFC<RegisterPageProps> = props => {
  return (
    <RegisterTemplate>
      <RegisterFormContainer />
    </RegisterTemplate>
  );
};

export default RegisterPage;
