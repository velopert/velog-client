import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../modules';
import PublishURLSetting from '../../components/write/PublishURLSetting';
import { escapeForUrl } from '../../lib/utils';
import { changeUrlSlug } from '../../modules/write';
import { useMount } from 'react-use';

interface OwnProps {}
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;
export type PublishURLSettingContainerProps = OwnProps &
  StateProps &
  DispatchProps;

const mapStateToProps = (state: RootState) => ({
  username: state.core.user && state.core.user.username,
  title: state.write.title,
  urlSlug: state.write.urlSlug,
});
const mapDispatchToProps = {
  changeUrlSlug,
};

const PublishURLSettingContainer: React.FC<PublishURLSettingContainerProps> = ({
  username,
  title,
  urlSlug,
  changeUrlSlug,
}) => {
  const defaultUrlSlug = escapeForUrl(title);
  const onChangeUrlSlug = useCallback(
    (urlSlug: string) => changeUrlSlug(urlSlug),
    [changeUrlSlug],
  );

  useMount(() => {
    if (!urlSlug) {
      changeUrlSlug(defaultUrlSlug);
    }
  });
  if (!username) return null;
  return (
    <PublishURLSetting
      username={username}
      urlSlug={urlSlug}
      onChangeUrlSlug={onChangeUrlSlug}
    />
  );
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  mapStateToProps,
  mapDispatchToProps,
)(PublishURLSettingContainer);
