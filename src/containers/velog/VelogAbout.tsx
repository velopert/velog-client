import React, { useState } from 'react';
import VelogAboutContent, {
  VelogAboutContentSkeleton,
} from '../../components/velog/VelogAboutContent';
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
import styled from 'styled-components';
import media from '../../lib/styles/media';
import { Helmet } from 'react-helmet-async';
import strip from 'strip-markdown';

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

  if (!data || !data.user) return <VelogAboutContentSkeleton />;

  return (
    <Block>
      <Helmet>
        <title>
          About {username} ({data.user.profile.display_name}) - velog
        </title>
        <meta
          name="description"
          content={
            data.user.profile.about
              ? strip(data.user.profile.about)
              : `${username}님의 자기소개가 비어있습니다.`
          }
        />
      </Helmet>
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
    </Block>
  );
};

const Block = styled.div`
  ${media.small} {
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;
export default VelogAbout;
