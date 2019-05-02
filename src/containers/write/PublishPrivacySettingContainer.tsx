import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../modules';
import PublishPrivacySetting, {
  PrivacySetting,
} from '../../components/write/PublishPrivacySetting';

interface OwnProps {}
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;
type PublishPrivacySettingContainerProps = OwnProps &
  StateProps &
  DispatchProps;

const mapStateToProps = (state: RootState) => ({});
const mapDispatchToProps = {};

const PublishPrivacySettingContainer: React.FC<
  PublishPrivacySettingContainerProps
> = props => {
  return (
    <PublishPrivacySetting
      selected={PrivacySetting.PUBLIC}
      onSelect={() => {}}
    />
  );
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  mapStateToProps,
  mapDispatchToProps,
)(PublishPrivacySettingContainer);
