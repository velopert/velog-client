import React from 'react';
import SeriesListContainer from '../../../containers/velog/SeriesListContainer';
import { RouteComponentProps } from 'react-router';

export interface SeriesTabProps
  extends RouteComponentProps<{
    username: string;
  }> {}

const SeriesTab: React.FC<SeriesTabProps> = ({ match }) => {
  return <SeriesListContainer username={match.params.username} />;
};

export default SeriesTab;
