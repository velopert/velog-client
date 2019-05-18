import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../modules';
import PublishPreview from '../../components/write/PublishPreview';
import { changeDescription } from '../../modules/write';
import useUpload from '../../lib/hooks/useUpload';
import useS3Upload from '../../lib/hooks/useS3Upload';

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

  const [upload, file] = useUpload();
  const [s3Upload, image, error] = useS3Upload();

  const onUpload = () => {
    upload();
  };

  useEffect(() => {
    if (!file) return;
    s3Upload(file, {
      type: 'post',
    });
  }, [file, s3Upload]);

  return (
    <PublishPreview
      title={title}
      defaultDescription={defaultDescription}
      description={description}
      onChangeDescription={onChangeDescription}
      onUpload={onUpload}
    />
  );
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  mapStateToProps,
  mapDispatchToProps,
)(PublishPreviewContainer);
