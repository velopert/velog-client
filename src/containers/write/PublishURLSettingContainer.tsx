import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../modules';
import PublishURLSetting from '../../components/write/PublishURLSetting';

interface OwnProps {}
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;
type PublishURLSettingContainerProps = OwnProps & StateProps & DispatchProps;

const mapStateToProps = (state: RootState) => ({});
const mapDispatchToProps = {};

const PublishURLSettingContainer: React.FC<
  PublishURLSettingContainerProps
> = props => {
  return (
    <PublishURLSetting
      username="velopert"
      urlSlug="sample-title"
      onChangeUrlSlug={() => {}}
    />
  );
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  mapStateToProps,
  mapDispatchToProps,
)(PublishURLSettingContainer);
