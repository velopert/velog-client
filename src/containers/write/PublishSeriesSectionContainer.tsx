import * as React from 'react';

import PublishSeriesSection from '../../components/write/PublishSeriesSection';
import { useDispatch } from 'react-redux';
import { toggleEditSeries } from '../../modules/write';

export interface PublishSeriesSectionContainerProps {}

const PublishSeriesSectionContainer: React.FC<
  PublishSeriesSectionContainerProps
> = props => {
  const dispatch = useDispatch();
  const onEdit = () => {
    dispatch(toggleEditSeries());
  };
  return <PublishSeriesSection onEdit={onEdit} />;
};

export default PublishSeriesSectionContainer;
