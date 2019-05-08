import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../modules';
import PublishPreview from '../../components/write/PublishPreview';
import { changeDescription } from '../../modules/write';

const mapStateToProps = (state: RootState) => ({
  title: state.write.title,
  description: state.write.description,
  defaultDescription: state.write.defaultDescription,
});

const mapDispatchToProps = {
  changeDescription,
};

interface OwnProps {}
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;
export type PublishPreviewContainerProps = OwnProps &
  StateProps &
  DispatchProps;

const { useCallback } = React;
const PublishPreviewContainer: React.FC<PublishPreviewContainerProps> = ({
  title,
  description,
  changeDescription,
  defaultDescription,
}) => {
  const onChangeDescription = useCallback(
    (description: string) => changeDescription(description),
    [changeDescription],
  );
  return (
    <PublishPreview
      title={title}
      defaultDescription={defaultDescription}
      description={description}
      onChangeDescription={onChangeDescription}
    />
  );
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  mapStateToProps,
  mapDispatchToProps,
)(PublishPreviewContainer);
