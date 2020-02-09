import React, { useEffect, useCallback, useRef } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../modules';
import PublishPreview from '../../components/write/PublishPreview';
import { changeDescription, setThumbnail } from '../../modules/write';
import useUpload from '../../lib/hooks/useUpload';
import useS3Upload from '../../lib/hooks/useS3Upload';

const mapStateToProps = (state: RootState) => ({
  title: state.write.title,
  description: state.write.description,
  defaultDescription: state.write.defaultDescription,
  thumbnail: state.write.thumbnail,
});

const mapDispatchToProps = {
  changeDescription,
  setThumbnail,
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
  thumbnail,
  setThumbnail,
}) => {
  const mounted = useRef(false);
  const onChangeDescription = useCallback(
    (description: string) => changeDescription(description),
    [changeDescription],
  );

  const [upload, file] = useUpload();
  const [s3Upload, image] = useS3Upload();

  // fills description with defaultDescription when it is empty
  useEffect(() => {
    if (mounted.current) return;

    if (!description) {
      changeDescription(defaultDescription);
    }

    mounted.current = true;
  }, [changeDescription, defaultDescription, description]);

  const onUpload = () => {
    upload();
  };

  useEffect(() => {
    if (!file) return;
    s3Upload(file, {
      type: 'post',
    });
  }, [file, s3Upload]);

  useEffect(() => {
    if (!image) return;
    setThumbnail(image);
  }, [image, setThumbnail]);

  const onResetThumbnail = useCallback(() => {
    setThumbnail(null);
  }, [setThumbnail]);

  return (
    <PublishPreview
      title={title}
      description={description}
      onChangeDescription={onChangeDescription}
      onUpload={onUpload}
      thumbnail={thumbnail}
      onResetThumbnail={onResetThumbnail}
    />
  );
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  mapStateToProps,
  mapDispatchToProps,
)(PublishPreviewContainer);
