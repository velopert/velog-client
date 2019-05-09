import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../modules';
import PublishPrivacySetting from '../../components/write/PublishPrivacySetting';
import { setPrivacy } from '../../modules/write';

const mapStateToProps = (state: RootState) => ({
  isPrivate: state.write.isPrivate,
});
const mapDispatchToProps = { setPrivacy };

interface OwnProps {}
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;
export type PublishPrivacySettingContainerProps = OwnProps &
  StateProps &
  DispatchProps;

const PublishPrivacySettingContainer: React.FC<
  PublishPrivacySettingContainerProps
> = ({ isPrivate, setPrivacy }) => {
  const onSelect = useCallback(isPrivate => setPrivacy(isPrivate), [
    setPrivacy,
  ]);
  return <PublishPrivacySetting isPrivate={isPrivate} onSelect={onSelect} />;
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  mapStateToProps,
  mapDispatchToProps,
)(PublishPrivacySettingContainer);
