import React, { useState } from 'react';
import VelogAboutContent from '../../components/velog/VelogAboutContent';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {
  GET_USER_ABOUT,
  GetUserAboutResponse,
  UPDATE_ABOUT,
} from '../../lib/graphql/user';
import useUser from '../../lib/hooks/useUser';
import useToggle from '../../lib/hooks/useToggle';
import VelogAboutEdit from '../../components/velog/VelogAboutEdit';
import VelogAboutRightButton from '../../components/velog/VelogAboutRightButton';

export interface VelogAboutProps {
  username: string;
}

const VelogAbout = ({ username }: VelogAboutProps) => {
  const { data } = useQuery<GetUserAboutResponse>(GET_USER_ABOUT, {
    variables: { username },
  });
  const [updateAbout] = useMutation(UPDATE_ABOUT);
  const [tempAbout, setTempAbout] = useState('');

  const user = useUser();
  const [edit, onToggleEdit] = useToggle(false);

  const own = (user && user.username === username) || false;
  const onClick = async () => {
    if (edit) {
      await updateAbout({
        variables: {
          about: tempAbout,
        },
      });
    }
    onToggleEdit();
  };
  if (!data || !data.user) return null;

  return (
    <>
      {own && (data.user.profile.about || edit) && (
        <VelogAboutRightButton edit={edit} onClick={onClick} />
      )}
      {edit ? (
        <VelogAboutEdit
          onChangeMarkdown={setTempAbout}
          initialMarkdown={data.user.profile.about}
        />
      ) : (
        <VelogAboutContent
          markdown={data.user.profile.about}
          own={own}
          onClickWrite={onToggleEdit}
        />
      )}
    </>
  );
};

export default VelogAbout;
