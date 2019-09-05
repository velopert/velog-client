import React, { useState } from 'react';
import VelogAboutContent from '../../components/velog/VelogAboutContent';
import { useQuery } from '@apollo/react-hooks';
import { GET_USER_ABOUT, GetUserAboutResponse } from '../../lib/graphql/user';
import useUser from '../../lib/hooks/useUser';
import useToggle from '../../lib/hooks/useToggle';

export interface VelogAboutProps {
  username: string;
}

const VelogAbout = ({ username }: VelogAboutProps) => {
  const { data, loading, error } = useQuery<GetUserAboutResponse>(
    GET_USER_ABOUT,
    { variables: { username } },
  );
  const user = useUser();
  const [edit, onToggleEdit] = useToggle(false);

  const own = (user && user.username === username) || false;
  if (!data || !data.user) return null;
  console.log(data);

  return edit ? null : (
    <VelogAboutContent
      markdown={data.user.profile.about}
      own={own}
      onClickWrite={onToggleEdit}
    />
  );
};

export default VelogAbout;
