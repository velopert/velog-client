import * as React from 'react';
import { connect } from 'react-redux';
import OpaqueLayer from '../../components/common/OpaqueLayer';
import AuthModalContainer from '../auth/AuthModalContainer';
import { RootState } from '../../modules';
import CommonPopup from './CommonPopup';
import useUserLoader from './hooks/useUserLoader';

interface OwnProps {}
interface StateProps {
  layer: boolean;
}
interface DispatchProps {}
type CoreProps = OwnProps & StateProps & DispatchProps;

const Core: React.FC<CoreProps> = ({ layer }) => {
  useUserLoader();

  return (
    <>
      <OpaqueLayer visible={layer} />
      <AuthModalContainer />
      <CommonPopup />
    </>
  );
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  state => ({
    layer: state.core.layer,
  }),
)(Core);
