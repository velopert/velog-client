import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../modules';
import PublishActionButtons from '../../components/write/PublishActionButtons';
import { closePublish, WriteMode } from '../../modules/write';
import { Mutation, MutationResult } from 'react-apollo';
import { WRITE_POST, Post } from '../../lib/graphql/post';
import { pick } from 'ramda';

const mapStateToProps = ({ write }: RootState) =>
  pick(
    [
      'mode',
      'markdown',
      'title',
      'html',
      'tags',
      'defaultDescription',
      'description',
      'isPrivate',
      'urlSlug',
      'thumbnail',
    ],
    write,
  );
const mapDispatchToProps = {
  closePublish,
};

interface OwnProps {}
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;
type PublishActionButtonsContainerProps = OwnProps & StateProps & DispatchProps;

const PublishActionButtonsContainer: React.FC<
  PublishActionButtonsContainerProps
> = ({ closePublish, ...rest }) => {
  const onCancel = useCallback(() => {
    closePublish();
  }, [closePublish]);
  return (
    <Mutation mutation={WRITE_POST}>
      {(writePost, { data, loading, error }: MutationResult<Partial<Post>>) => {
        return (
          <PublishActionButtons
            onCancel={onCancel}
            onPublish={async () => {
              try {
                const response = await writePost({
                  variables: {
                    title: rest.title,
                    body:
                      rest.mode === WriteMode.MARKDOWN
                        ? rest.markdown
                        : rest.html,
                    tags: rest.tags,
                    is_markdown: rest.mode === WriteMode.MARKDOWN,
                    is_temp: false,
                    is_private: rest.isPrivate,
                    url_slug: rest.urlSlug,
                    thumbnail: rest.thumbnail,
                    meta: {},
                  },
                });
                console.log(response);
              } catch (e) {
                console.log(e);
              }
            }}
          />
        );
      }}
    </Mutation>
  );
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  mapStateToProps,
  mapDispatchToProps,
)(PublishActionButtonsContainer);
