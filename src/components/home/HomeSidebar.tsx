import React from 'react';
import styled from 'styled-components';
import MainNoticeWidgetContainer from '../../containers/home/MainNoticeWidgetContainer';
import MainTagWidgetContainer from '../../containers/home/MainTagWidgetContainer';
import HomeRightFooter from './HomeRightFooter';
import Sticky from '../common/Sticky';

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

const Block = styled.div``;

export default HomeSidebar;
