import * as React from 'react';
import Header from '../../components/base/Header';
import { getScrollTop } from '../../lib/utils';
import { RootState } from '../../modules';
import { connect } from 'react-redux';
import { showAuthModal } from '../../modules/core';
import { QueryResult, Query } from 'react-apollo';
import { GET_CURRENT_USER, CurrentUser } from '../../lib/graphql/user';

const { useEffect, useRef, useState, useCallback } = React;

interface OwnProps {}
interface StateProps {}
interface DispatchProps {
  showAuthModal: typeof showAuthModal;
}
type HeaderContainerProps = OwnProps & StateProps & DispatchProps;

const HeaderContainer: React.SFC<HeaderContainerProps> = ({
  showAuthModal,
}) => {
  const lastY = useRef(0);
  const direction = useRef<null | 'UP' | 'DOWN'>(null);

  const [floating, setFloating] = useState(false);
  const [baseY, setBaseY] = useState(0);
  const [floatingMargin, setFloatingMargin] = useState(-60);
  const onScroll = useCallback(() => {
    const scrollTop = getScrollTop();

    // turns floating OFF
    if (floating && scrollTop === 0) {
      setFloating(false);
      setFloatingMargin(-60);
      return;
    }

    if (floating) {
      const calculated = -60 + baseY - scrollTop;
      setFloatingMargin(calculated > 0 ? 0 : calculated);
    }

    const d = scrollTop < lastY.current ? 'UP' : 'DOWN';

    // Fixes flickering issue
    if (
      d !== direction.current &&
      (floatingMargin === 0 || floatingMargin <= -60)
    ) {
      setBaseY(scrollTop + (d === 'DOWN' ? 60 : 0));
    }

    // turns floating ON
    if (direction.current !== 'UP' && d === 'UP' && scrollTop > 120) {
      setFloating(true);
    }

    direction.current = d;
    lastY.current = scrollTop;
  }, [baseY, floating, floatingMargin]);

  useEffect(() => {
    document.addEventListener('scroll', onScroll);
    const reset = () => {
      document.removeEventListener('scroll', onScroll);
    };
    return reset;
  }, [floating, baseY, floatingMargin]);

  const onLoginClick = () => {
    showAuthModal('LOGIN');
  };

  return (
    <Query query={GET_CURRENT_USER}>
      {({ loading, error, data }: QueryResult<{ auth: CurrentUser }>) => {
        return (
          <Header
            floating={floating}
            floatingMargin={floatingMargin}
            onLoginClick={onLoginClick}
          />
        );
      }}
    </Query>
  );
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  state => ({}),
  { showAuthModal },
)(HeaderContainer);
