import React, { useCallback, ReactNode } from 'react';
import styled from 'styled-components';
import PlainLink from './PlainLink';
import { useApolloClient } from '@apollo/react-hooks';
import { READ_POST } from '../../lib/graphql/post';

const PostLinkBlock = styled(PlainLink)``;

export interface PostLinkProps {
  className?: string;
  username: string;
  urlSlug: string;
  prefetch?: boolean;
  children?: ReactNode;
}

const PostLink: React.FC<PostLinkProps> = ({
  username,
  urlSlug,
  prefetch = true,
  children,
  className,
}) => {
  const to = `/@${username}/${urlSlug}`;

  const client = useApolloClient();
  const onPrefetch = useCallback(() => {
    if (!prefetch) {
      return;
    }
    client.query({
      query: READ_POST,
      variables: {
        username,
        url_slug: urlSlug,
      },
    });
  }, [prefetch, client, username, urlSlug]);

  return (
    <PostLinkBlock to={to} onMouseEnter={onPrefetch} className={className}>
      {children}
    </PostLinkBlock>
  );
};

export default PostLink;
