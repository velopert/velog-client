import React from 'react';
import styled from 'styled-components';
import { Logo } from '../../static/svg';
import RoundButton from '../common/RoundButton';
import HomeResponsive from './HomeResponsive';

export type HomeHeaderProps = {};

function HomeHeader(props: HomeHeaderProps) {
  return (
    <Block>
      <Inner>
        <Logo />
        <Right>
          <RoundButton color="darkGray" onClick={() => {}}>
            로그인
          </RoundButton>
        </Right>
      </Inner>
    </Block>
  );
}

const Block = styled.div`
  height: 4rem;
`;

const Inner = styled(HomeResponsive)`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
`;

export default HomeHeader;
