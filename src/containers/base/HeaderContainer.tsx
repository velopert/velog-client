import * as React from 'react';
import styled from 'styled-components';
import Header from '../../components/base/Header';
import { getScrollTop } from '../../lib/utils';
const { useEffect, useRef } = React;

const HeaderContainerBlock = styled.div``;

interface HeaderContainerProps {}

const HeaderContainer: React.SFC<HeaderContainerProps> = props => {
  const lastY = useRef(0);
  const onScroll = () => {
    const scrollTop = getScrollTop();
    console.log(scrollTop, lastY.current);
    if (scrollTop < lastY.current) {
      console.log('Baaaam!');
    }
    lastY.current = scrollTop;
  };
  useEffect(() => {
    document.addEventListener('scroll', onScroll);
    const unmount = () => {};
    return unmount;
  }, []);
  return <Header />;
};

export default HeaderContainer;
