import React from 'react';
import UserPosts from '../../../containers/velog/UserPosts';
import { RouteComponentProps } from 'react-router';

export interface UserPostsTabProps
  extends RouteComponentProps<{ username: string }> {
  username: string;
}

const UserPostsTab: React.FC<UserPostsTabProps> = ({ match }) => {
  return <UserPosts username={match.params.username} />;
};

export default UserPostsTab;
