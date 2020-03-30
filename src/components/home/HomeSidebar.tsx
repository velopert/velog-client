import React from 'react';
import styled from 'styled-components';
import MainNoticeWidgetContainer from '../../containers/home/MainNoticeWidgetContainer';
import MainTagWidgetContainer from '../../containers/home/MainTagWidgetContainer';
import HomeRightFooter from './HomeRightFooter';
import Sticky from '../common/Sticky';
import { mediaQuery } from '../../lib/styles/media';

export type HomeSidebarProps = {};

function HomeSidebar(props: HomeSidebarProps) {
  return (
    <Sticky top={118}>
      <Block>
        <MainNoticeWidgetContainer />
        <MainTagWidgetContainer />
        <HomeRightFooter />
      </Block>
    </Sticky>
  );
}

const Block = styled.div`
  width: 16rem;
  ${mediaQuery(1440)} {
    width: 12rem;
  }
`;

export default HomeSidebar;
