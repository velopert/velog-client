import * as React from 'react';
import { Query, QueryResult } from 'react-apollo';
import { GET_VELOG_CONFIG, VelogConfig } from '../../lib/graphql/user';

export interface ConfigLoaderProps {
  username: string;
}

const ConfigLoader: React.FC<ConfigLoaderProps> = ({ username }) => {
  return (
    <Query query={GET_VELOG_CONFIG} variables={{ username }}>
      {(result: QueryResult<{ velog_config: VelogConfig }>) => {
        // console.log(result);
        return null;
      }}
    </Query>
  );
};

export default ConfigLoader;
