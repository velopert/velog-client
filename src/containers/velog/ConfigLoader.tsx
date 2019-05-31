import * as React from 'react';
import { Query, QueryResult } from 'react-apollo';
import { GET_VELOG_CONFIG, VelogConfig } from '../../lib/graphql/user';

export interface ConfigLoaderProps {
  username: string;
}

const ConfigLoader: React.FC<ConfigLoaderProps> = ({ username }) => {
  return (
    <Query query={GET_VELOG_CONFIG} variables={{ username }}>
      {({
        loading,
        data,
        error,
      }: QueryResult<{ velog_config: VelogConfig }>) => {
        if (error) {
          console.log(error);
        }
        if (error || loading) return null;
        if (!data) return null;
        return <div>{data.velog_config.title}</div>;
      }}
    </Query>
  );
};

export default ConfigLoader;
