import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../modules';
import PublishSeriesSection from '../../components/write/PublishSeriesSection';

interface OwnProps {}
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;
type PublishSeriesSectionContainerProps = OwnProps & StateProps & DispatchProps;

const mapStateToProps = (state: RootState) => ({});
const mapDispatchToProps = {};

const PublishSeriesSectionContainer: React.FC<
  PublishSeriesSectionContainerProps
> = props => {
  return <PublishSeriesSection />;
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  mapStateToProps,
  mapDispatchToProps,
)(PublishSeriesSectionContainer);
