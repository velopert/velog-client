import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../modules';
import PublishPreview from '../../components/write/PublishPreview';

interface OwnProps {}
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;
type PublishPreviewContainerProps = OwnProps & StateProps & DispatchProps;

const mapStateToProps = (state: RootState) => ({});
const mapDispatchToProps = {};

const PublishPreviewContainer: React.FC<
  PublishPreviewContainerProps
> = props => {
  return <PublishPreview />;
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  mapStateToProps,
  mapDispatchToProps,
)(PublishPreviewContainer);
