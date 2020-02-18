import React from 'react';

import UserTagVerticalList from './UserTagVerticalList';
import useUserTags from './hooks/useUserTags';
import UserTagHorizontalList from './UserTagHorizontalList';

export type UserTagsProps = {
  username: string;
  tag: string | null;
};

function UserTags({ username, tag }: UserTagsProps) {
  const { data, loading } = useUserTags(username);
  if (!data || loading) return null;

  return (
    <>
      <UserTagVerticalList
        active={tag}
        tags={data.tags}
        postsCount={data.postsCount}
        username={username}
      />
      <UserTagHorizontalList
        active={tag}
        tags={data.tags}
        postsCount={data.postsCount}
        username={username}
      />
    </>
  );
}

export default UserTags;
