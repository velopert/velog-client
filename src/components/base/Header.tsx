import * as React from 'react';
import styled from 'styled-components';
import { Logo } from '../../static/svg';
import Button from '../common/Button';

const HeaderBlock = styled.div`
  width: 100%;
  .wrapper {
    width: 1200px;
    height: 4rem;
    margin: 0 auto;
    padding-left: 1rem;
    padding-right: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

interface HeaderProps {}

const Header: React.SFC<HeaderProps> = props => {
  return (
    <HeaderBlock>
      <div className="wrapper">
        <div className="brand">
          <Logo />
        </div>
        <div className="right">
          <Button>로그인</Button>
        </div>
      </div>
    </HeaderBlock>
  );
};

export default Header;
