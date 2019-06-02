import React, { useEffect } from 'react';
import { Query, QueryResult } from 'react-apollo';
import { connect } from 'react-redux';
import { GET_VELOG_CONFIG, VelogConfig } from '../../lib/graphql/user';
import { setUserLogo, setCustom, setVelogUsername } from '../../modules/header';
import { RootState } from '../../modules';

interface ConfigEffectProps {
  velogConfig: VelogConfig;
  onConfigChange: (config: VelogConfig) => any;
}

const ConfigEffect: React.FC<ConfigEffectProps> = ({
  velogConfig,
  onConfigChange,
}) => {
  useEffect(() => {
    onConfigChange(velogConfig);
  }, [onConfigChange, velogConfig]);
  return null;
};

const mapDispatchToProps = {
  setUserLogo,
  setCustom,
  setVelogUsername,
};

type OwnProps = {
  username: string;
};
type StateProps = {};
type DispatchProps = typeof mapDispatchToProps;
export type ConfigLoaderProps = OwnProps & StateProps & DispatchProps;

const ConfigLoader: React.FC<ConfigLoaderProps> = ({
  username,
  setUserLogo,
  setCustom,
  setVelogUsername,
}) => {
  useEffect(() => {
    setCustom(true);
    return () => {
      setCustom(false);
    };
  }, [setCustom]);

  useEffect(() => {
    setVelogUsername(username);
  }, [setVelogUsername, username]);

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
        return (
          <ConfigEffect
            velogConfig={data.velog_config}
            onConfigChange={setUserLogo}
          />
        );
      }}
    </Query>
  );
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  () => ({}),
  mapDispatchToProps,
)(ConfigLoader);
