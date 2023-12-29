import * as React from 'react';
import styled, { css } from 'styled-components';
import media from '../../lib/styles/media';
import { debounce } from 'throttle-debounce';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import { FOLLOW_USER, UNFOLLOW_USER } from '../../lib/graphql/user';
import { gql } from 'apollo-boost';
import useUser from '../../lib/hooks/useUser';
import { toast } from 'react-toastify';
import { themedPalette } from '../../lib/styles/themes';

export interface PostFollowButtonProps {
  followingUserId: string;
  followed: boolean | undefined;
}

const FollowButton: React.FC<PostFollowButtonProps> = ({
  followingUserId,
  followed,
}) => {
  const client = useApolloClient();
  const currentUser = useUser();
  const [follow, { loading: loadingFollowUser }] = useMutation(FOLLOW_USER);
  const [unfollow, { loading: loadingUnfollowUser }] =
    useMutation(UNFOLLOW_USER);

  const [initialFollowState, setInitialFollowState] = React.useState<boolean>(
    !!followed,
  );
  const [currentFollowState, setCurrentFollowState] = React.useState<boolean>(
    !!followed,
  );

  const [buttonText, setButtonText] = React.useState('팔로잉');

  const onFollowButtonMouseLeave = () => {
    setInitialFollowState(currentFollowState || false);
  };

  const onUnfollowButtonMouseEnter = () => {
    setButtonText('언팔로우');
  };

  const onUnfollowButtonMouseLeave = () => {
    setButtonText('팔로잉');
  };

  const onClick = debounce(300, () => {
    if (loadingFollowUser || loadingUnfollowUser) return;

    const variables = {
      following_user_id: followingUserId,
    };

    const followFragment = gql`
      fragment user on User {
        is_followed
      }
    `;

    try {
      if (!currentUser) {
        toast.error('로그인 후 이용해주세요.');
        return;
      }

      if (currentFollowState) {
        client.writeFragment({
          id: `User:${followingUserId}`,
          fragment: followFragment,
          data: {
            is_followed: false,
            __typename: 'User',
          },
        });
        unfollow({ variables });
      } else {
        client.writeFragment({
          id: `User:${followingUserId}`,
          fragment: followFragment,
          data: {
            is_followed: true,
            __typename: 'User',
          },
        });
        console.log('hello', variables);
        follow({ variables });
        setButtonText('팔로잉');
      }

      setInitialFollowState(!currentFollowState);
      setCurrentFollowState(!currentFollowState);
    } catch (error) {
      console.log('handle follow state error', error);
    }
  });

  React.useEffect(() => {
    if (followed === undefined) return;
    setInitialFollowState(followed);
    setCurrentFollowState(followed);
  }, [followed]);

  if (followed === undefined) return null;

  return (
    <FollowButtonBlock
      data-testid="follow-btn"
      followed={!!currentFollowState}
      unfollowed={buttonText === '언팔로우'}
    >
      {!initialFollowState ? (
        <button
          className="follow-button button"
          onClick={onClick}
          onMouseLeave={onFollowButtonMouseLeave}
        >
          <span>{!currentFollowState ? '팔로우' : '팔로잉'}</span>
        </button>
      ) : (
        <button
          className="unfollow-button button"
          onClick={onClick}
          onMouseEnter={onUnfollowButtonMouseEnter}
          onMouseLeave={onUnfollowButtonMouseLeave}
        >
          <span>{buttonText}</span>
        </button>
      )}
    </FollowButtonBlock>
  );
};

const FollowButtonBlock = styled.div<{
  followed: boolean;
  unfollowed: boolean;
}>`
  width: 96px;
  height: 32px;
  font-size: 16px;

  ${media.small} {
    width: 80px;
    height: 24px;
    font-size: 14px;
  }

  ${media.custom(425)} {
    width: 72px;
    font-size: 12px;
  }

  .button {
    display: flex;
    box-shadow: none;
    align-items: center;
    justify-content: center;
    background-color: ${themedPalette.bg_element1};
    cursor: pointer;
    border-radius: 16px;
    font-weight: 700;
    width: 100%;
    height: 100%;
    white-space: nowrap;
    outline: none;
    font-size: 16px;

    ${media.small} {
      font-size: 14px;
    }

    ${media.custom(425)} {
      font-size: 12px;
    }
  }

  .follow-button {
    color: ${themedPalette.primary1};
    border: 1px solid ${themedPalette.primary1};

    ${(props) =>
      props.followed &&
      css`
        color: ${themedPalette.bg_element6};
        border: 1px solid ${themedPalette.bg_element6};
      `}
  }

  .unfollow-button {
    color: ${themedPalette.bg_element6};
    border: 1px solid ${themedPalette.bg_element6};

    ${(props) =>
      props.unfollowed &&
      css`
        &:hover,
        &:active {
          color: ${themedPalette.destructive1};
          border: 1px solid ${themedPalette.destructive1};
        }
      `}
  }
`;

export default FollowButton;
