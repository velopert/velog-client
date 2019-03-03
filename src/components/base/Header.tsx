import * as React from 'react';
import styled, { css } from 'styled-components';
import { Logo } from '../../static/svg';
import Button from '../common/Button';
import { breakpoints } from '../../lib/styles/responsive';

const HeaderBlock = styled.div<{
  floating: boolean;
}>`
  width: 100%;
  .wrapper {
    width: ${breakpoints.xlarge};
    height: 4rem;
    margin: 0 auto;
    padding-left: 1rem;
    padding-right: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  ${props =>
    props.floating &&
    css`
      position: fixed;
      top: 0;
      background: rgba(255, 255, 255, 0.9);
      box-shadow: 0px 0 8px rgba(0, 0, 0, 0.08);
    `}
`;

const Placeholder = styled.div`
  width: 100%;
  height: 4rem;
`;

interface HeaderProps {
  floating: boolean;
  floatingMargin: number;
}

const Header: React.SFC<HeaderProps> = ({ floating, floatingMargin }) => {
  return (
    <>
      <HeaderBlock
        floating={floating}
        style={{ marginTop: floating ? floatingMargin : 0 }}
      >
        <div className="wrapper">
          <div className="brand">
            <Logo />
          </div>
          <div className="right">
            <Button>로그인</Button>
          </div>
        </div>
      </HeaderBlock>
      {floating && <Placeholder />}
    </>
  );
};

export default Header;
