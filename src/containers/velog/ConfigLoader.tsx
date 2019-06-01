import React, { useEffect } from 'react';
import { Query, QueryResult } from 'react-apollo';
import { connect } from 'react-redux';
import { GET_VELOG_CONFIG, VelogConfig } from '../../lib/graphql/user';

export interface ConfigLoaderProps {
  username: string;
}

interface ConfigEffectProps {
  velogConfig: VelogConfig;
}
const ConfigEffect: React.FC<ConfigEffectProps> = ({ velogConfig }) => {
  useEffect(() => {
    console.log(velogConfig);
  }, [velogConfig]);
  return null;
};

const ConfigEffectContainer = connect(() => ({}));

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
        return <ConfigEffect velogConfig={data.velog_config} />;
      }}
    </Query>
  );
};

export default ConfigLoader;
