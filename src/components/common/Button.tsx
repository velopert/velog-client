import * as React from 'react';
import styled from 'styled-components';

const ButtonBlock = styled.div``;

interface ButtonProps {}

const Button: React.SFC<ButtonProps> = props => {
  return <ButtonBlock />;
};

export default Button;
