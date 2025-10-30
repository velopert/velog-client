import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import OpaqueLayer from '../../components/common/OpaqueLayer';
import AuthModalContainer from '../auth/AuthModalContainer';
import { RootState } from '../../modules';
import CommonPopup from './CommonPopup';
import useUserLoader from './hooks/useUserLoader';
import GlobalStyles from '../../GlobalStyles';
import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';
import gtag from '../../lib/gtag';
import { useThemeEffect } from '../../components/base/hooks/useThemeEffect';
import BodyTransition from '../../components/base/BodyTransition';
import useGoogleAnalyticsUserTracking from '../../lib/hooks/useGoogleAnalyticsUserTracking';

interface OwnProps {}
interface StateProps {
  layer: boolean;
}
interface DispatchProps {}
type CoreProps = OwnProps & StateProps & DispatchProps;

const Core: React.FC<CoreProps> = ({ layer }) => {
  useUserLoader();
  useThemeEffect();
  useGoogleAnalyticsUserTracking();

  const history = useHistory();

  useEffect(() => {
    const unregister = history.listen((location) => {
      // adds setTimeout for page title sync
      // is there any better solution?
      setTimeout(() => {
        gtag('config', 'G-8D0MD2S4PK', {
          page_path: location.pathname + location.search,
        });
      }, 1000);
    });

    return () => {
      unregister();
    };
  }, [history]);

  return (
    <>
      <OpaqueLayer visible={layer} />
      <AuthModalContainer />
      <CommonPopup />
      <GlobalStyles />
      <BodyTransition />
      <ToastContainer
        transition={Flip}
        position="top-right"
        autoClose={2000}
        closeOnClick
        pauseOnHover
      />
    </>
  );
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  (state) => ({
    layer: state.core.layer,
  }),
)(Core);
