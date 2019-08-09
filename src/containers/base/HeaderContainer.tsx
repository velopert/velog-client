import React, { useReducer } from 'react';
import Header from '../../components/base/Header';
import { getScrollTop } from '../../lib/utils';
import { RootState } from '../../modules';
import { connect, useSelector, useDispatch } from 'react-redux';
import { showAuthModal } from '../../modules/core';

const { useEffect, useRef, useCallback } = React;

type HeaderContainerProps = {};

type StartFloating = {
  type: 'START_FLOATING';
};

type ExitFloating = {
  type: 'EXIT_FLOATING';
};

type SetMargin = {
  type: 'SET_MARGIN';
  margin: number;
};

type FloatingState = {
  floating: boolean;
  margin: number;
};

type Action = StartFloating | ExitFloating | SetMargin;

function reducer(state: FloatingState, action: Action) {
  switch (action.type) {
    case 'START_FLOATING':
      return {
        ...state,
        margin: -80,
        floating: true,
      };
    case 'EXIT_FLOATING':
      return {
        ...state,
        floating: false,
        margin: -80,
      };
    case 'SET_MARGIN':
      return {
        ...state,
        margin: action.margin,
      };
    default:
      throw new Error('Unhandled Action');
  }
}

const HeaderContainer: React.SFC<HeaderContainerProps> = () => {
  const { user, custom, userLogo, velogUsername } = useSelector(
    (state: RootState) => ({
      user: state.core.user,
      custom: state.header.custom,
      userLogo: state.header.userLogo,
      velogUsername: state.header.velogUsername,
    }),
  );
  const dispatch = useDispatch();

  const [{ floating, margin }, localDispatch] = useReducer(reducer, {
    floating: false,
    margin: 0,
  });
  const prevScrollTop = useRef(0);
  const prevDirection = useRef<'DOWN' | 'UP'>('DOWN');
  const baseY = useRef(0);

  const scrolling = useRef(false);
  const scrollingTimeoutId = useRef<null | number>(null);

  const onScroll = useCallback(() => {
    if (scrollingTimeoutId.current) {
      clearTimeout(scrollingTimeoutId.current);
    }
    scrollingTimeoutId.current = setTimeout(() => {
      scrolling.current = false;
    }, 500);

    const scrollTop = getScrollTop();

    if (scrollTop > 80) {
      localDispatch({ type: 'START_FLOATING' });
    }
    if (scrollTop === 0) {
      localDispatch({ type: 'EXIT_FLOATING' });
      prevDirection.current = 'DOWN';
      prevScrollTop.current = 0;
      baseY.current = 0;
    }

    let direction: 'UP' | 'DOWN' =
      prevScrollTop.current > scrollTop ? 'UP' : 'DOWN';

    let margin = -80 + baseY.current - scrollTop;

    // set limits for margin
    if (margin < -80) {
      margin = -80;
    }
    if (margin > 0) {
      margin = 0;
    }

    // Scrolled by TOC
    if (!scrolling.current && scrollTop - prevScrollTop.current < -80) {
      localDispatch({
        type: 'SET_MARGIN',
        margin: -80,
      });
      prevScrollTop.current = scrollTop;
      prevDirection.current = 'DOWN';
      baseY.current = 0;
      return;
    }
    // hide header when moved by TOC
    // if (
    //   prevDirection.current === 'DOWN' &&
    //   scrollTop - prevScrollTop.current < -80
    // ) {
    //   // margin = -80;
    //   // direction = 'DOWN';
    //   // baseY.current = 0;
    // }

    // direction changes from down to up
    if (prevDirection.current !== direction && [-80, 0].includes(margin)) {
      baseY.current = prevScrollTop.current + (direction === 'DOWN' ? 80 : 0);
    }

    localDispatch({
      type: 'SET_MARGIN',
      margin: margin,
    });

    prevDirection.current = direction;
    prevScrollTop.current = scrollTop;
    scrolling.current = true;
  }, []);

  useEffect(() => {
    document.addEventListener('scroll', onScroll);
    return () => {
      document.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);

  const onLoginClick = () => {
    dispatch(showAuthModal('LOGIN'));
  };

  return (
    <Header
      floating={floating}
      floatingMargin={margin}
      onLoginClick={onLoginClick}
      user={user}
      custom={custom}
      userLogo={userLogo}
      velogUsername={velogUsername}
    />
  );
};

export default HeaderContainer;
