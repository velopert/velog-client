import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import { bindActionCreators } from 'redux';
import home from '../../../modules/home';
import { RootState } from '../../../modules';

export function useTimeframe() {
  const dispatch = useDispatch();
  const actions = useMemo(
    () => bindActionCreators(home.actions, dispatch),
    [dispatch],
  );
  const timeframe = useSelector((state: RootState) => state.home.timeframe);

  return [timeframe, actions.choose] as const;
}
