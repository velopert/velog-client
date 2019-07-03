import React, { useState } from 'react';
import PublishSeriesCreate from '../../components/write/PublishSeriesCreate';
import useUser from '../../lib/hooks/useUser';
import { safe } from '../../lib/utils';
import PublishSeriesConfigTemplate from '../../components/write/PublishSeriesConfigTemplate';
import PublishSeriesList from './PublishSeriesList';

export interface PublishSeriesConfigProps {}

const PublishSeriesConfig: React.FC<PublishSeriesConfigProps> = props => {
  const user = useUser();
  const [selectedId, setSelectedId] = useState<null | number>(null);

  const onChangeId = (id: number) => {
    if (selectedId === id) {
      setSelectedId(null);
    }
    setSelectedId(id);
  };
  return (
    <PublishSeriesConfigTemplate>
      <PublishSeriesCreate
        onSubmit={() => {}}
        username={safe(() => user!.username) || ''}
      />
      <PublishSeriesList
        list={[
          { id: 1, text: 'asdf' },
          { id: 2, text: 'aszxcdf' },
          { id: 3, text: 'aszxcvdf' },
          { id: 4, text: 'aszxcvzxcdf' },
        ]}
        selectedId={selectedId}
        onChangeId={onChangeId}
      />
    </PublishSeriesConfigTemplate>
  );
};

export default PublishSeriesConfig;
