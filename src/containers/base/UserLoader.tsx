import React, { useEffect, useCallback } from 'react';
import { Query, QueryResult } from 'react-apollo';
import { connect } from 'react-redux';
import { CurrentUser, GET_CURRENT_USER } from '../../lib/graphql/user';
import { RootState } from '../../modules';
import { setUser } from '../../modules/core';

const DetectUserChange: React.FC<{
  user: CurrentUser | null;
  onSetUser: (user: CurrentUser | null) => void;
}> = ({ user, onSetUser }) => {
  useEffect(() => {
    onSetUser(user);
  }, [onSetUser, user]);
  return null;
};

const mapStateToProps = (state: RootState) => ({});
const mapDispatchToProps = {
  setUser,
};

interface OwnProps {}
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;
export type UserLoaderProps = OwnProps & StateProps & DispatchProps;

const UserLoader: React.FC<UserLoaderProps> = ({ setUser }) => {
  const onSetUser = useCallback(
    (user: CurrentUser | null) => {
      setUser(user);
    },
    [setUser],
  );
  return (
    <Query query={GET_CURRENT_USER}>
      {({ loading, error, data }: QueryResult<{ auth: CurrentUser }>) => {
        if (loading || error) return null;
        const user = data && data.auth;
        return <DetectUserChange user={user || null} onSetUser={onSetUser} />;
      }}
    </Query>
  );
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  mapStateToProps,
  mapDispatchToProps,
)(UserLoader);
