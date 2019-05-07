import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../modules';
import PublishPreview from '../../components/write/PublishPreview';

const mapStateToProps = (state: RootState) => ({
  title: state.write.title,
});
const mapDispatchToProps = {};

interface OwnProps {}
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;
export type PublishPreviewContainerProps = OwnProps &
  StateProps &
  DispatchProps;

const PublishPreviewContainer: React.FC<PublishPreviewContainerProps> = ({
  title,
}) => {
  return <PublishPreview title={title} />;
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  mapStateToProps,
  mapDispatchToProps,
)(PublishPreviewContainer);
