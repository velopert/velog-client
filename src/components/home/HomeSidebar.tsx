import React from 'react';
import styled from 'styled-components';
import MainNoticeWidgetContainer from '../../containers/main/MainNoticeWidgetContainer';
import MainTagWidgetContainer from '../../containers/main/MainTagWidgetContainer';
import MainRightFooter from '../main/MainRightFooter';
import Sticky from '../common/Sticky';

export type HomeSidebarProps = {};

function HomeSidebar(props: HomeSidebarProps) {
  return (
    <Sticky top={80}>
      <Block>
        <MainNoticeWidgetContainer />
        <MainTagWidgetContainer />
        <MainRightFooter />
      </Block>
    </Sticky>
  );
}

const Block = styled.div``;

export default HomeSidebar;
