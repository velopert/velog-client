import React, { useEffect, useCallback, useRef } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import PublishPreview from '../../components/write/PublishPreview';
import {
  changeDescription,
  setThumbnail,
  setWritePostId,
} from '../../modules/write';
import useUpload from '../../lib/hooks/useUpload';
import { useCFUpload } from '../../lib/hooks/useCFUpload';
import { useMutation } from '@apollo/react-hooks';
import { WritePostResponse, WRITE_POST } from '../../lib/graphql/post';
import { useUncachedApolloClient } from '../../lib/graphql/UncachedApolloContext';
import { escapeForUrl } from '../../lib/utils';

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
  const uncachedClient = useUncachedApolloClient();
  const [writePost] = useMutation<WritePostResponse>(WRITE_POST, {
    client: uncachedClient,
  });
  const [upload, file] = useUpload();
  const { upload: cfUpload, image } = useCFUpload();

  const { markdown, postId, tags } = useSelector(
    (state: RootState) => state.write,
  );

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

  const dispatch = useDispatch();

  const getValidPostId = useCallback(async () => {
    if (postId) return postId;
    const validTitle = title || 'Temp Title';
    const validBody = markdown || 'Temp Body';

    const response = await writePost({
      variables: {
        title: validTitle,
        body: validBody,
        tags,
        is_markdown: true,
        is_temp: true,
        is_private: false,
        url_slug: escapeForUrl(validTitle),
        thumbnail: null,
        meta: {},
        series_id: null,
        token: null,
      },
    });

    if (!response || !response.data) return null;
    const id = response.data.writePost.id;
    dispatch(setWritePostId(id));
    return id;
  }, [postId, writePost, markdown, tags, title, dispatch]);

  const uploadWithPostId = useCallback(
    async (file: File) => {
      const id = await getValidPostId();
      if (!id) return;
      cfUpload(file, { type: 'post', refId: id });
    },
    [cfUpload, getValidPostId],
  );

  useEffect(() => {
    if (!file) return;
    uploadWithPostId(file);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

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
