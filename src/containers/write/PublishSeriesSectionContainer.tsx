import * as React from 'react';

import PublishSeriesSection from '../../components/write/PublishSeriesSection';
import { useDispatch, useSelector } from 'react-redux';
import { toggleEditSeries } from '../../modules/write';
import { RootState } from '../../modules';

export interface PublishSeriesSectionContainerProps {}

const PublishSeriesSectionContainer: React.FC<
  PublishSeriesSectionContainerProps
> = props => {
  const selectedSeries = useSelector(
    (state: RootState) => state.write.selectedSeries,
  );
  const dispatch = useDispatch();
  const onEdit = () => {
    dispatch(toggleEditSeries());
  };
  return <PublishSeriesSection onEdit={onEdit} selected={selectedSeries} />;
};

export default PublishSeriesSectionContainer;
