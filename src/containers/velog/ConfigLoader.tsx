import React, { useEffect } from 'react';
import { Query, QueryResult } from 'react-apollo';
import { connect } from 'react-redux';
import { GET_VELOG_CONFIG, VelogConfig } from '../../lib/graphql/user';
import { setUserLogo } from '../../modules/header';

export interface ConfigLoaderProps {
  username: string;
}

interface ConfigEffectProps {
  velogConfig: VelogConfig;
  setUserLogo: typeof setUserLogo;
}

const ConfigEffect: React.FC<ConfigEffectProps> = ({
  velogConfig,
  setUserLogo,
}) => {
  useEffect(() => {
    setUserLogo(velogConfig);
  }, [setUserLogo, velogConfig]);
  return null;
};

const ConfigEffectContainer = connect(
  () => ({}),
  { setUserLogo },
)(ConfigEffect);

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
        return <ConfigEffectContainer velogConfig={data.velog_config} />;
      }}
    </Query>
  );
};

export default ConfigLoader;
