import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import media from '../../lib/styles/media';
import { useQuery } from '@apollo/react-hooks';
import {
  GetRecommendedPostResponse,
  GET_RECOMMENDED_POST,
  PartialPost,
} from '../../lib/graphql/post';
import PostCardGrid from '../../components/common/PostCardGrid';
import palette from '../../lib/styles/palette';
import { detectAnyAdblocker } from 'just-detect-adblock';

function RelatedPost({
  postId,
  showAds,
}: {
  postId: string;
  showAds: boolean;
}) {
  const [adBlocked, setAdBlocked] = useState(false);
  useEffect(() => {
    detectAnyAdblocker().then((detected: boolean) => {
      if (detected) {
        setAdBlocked(true);
      }
    });
  }, []);

  const { data } = useQuery<GetRecommendedPostResponse>(GET_RECOMMENDED_POST, {
    variables: {
      id: postId,
    },
  });

  const postWithAds = useMemo(() => {
    if (!data?.post) return null;
    if (!showAds || adBlocked) return data.post.recommended_posts;
    const cloned: (PartialPost | undefined)[] = [
      ...data.post.recommended_posts,
    ];
    // get random number between 0 and length of array
    const randomIndex = () => Math.floor(Math.random() * 8);
    const firstAdIndex = randomIndex();
    const secondAdIndex = (() => {
      let index = randomIndex();
      while (index === firstAdIndex) {
        index = randomIndex();
      }
      return index;
    })();

    cloned[firstAdIndex] = undefined;
    cloned[secondAdIndex] = undefined;
    return cloned;
  }, [data, showAds, adBlocked]);

  if (!postWithAds) return null;

  return (
    <>
      <Background>
        <Title>관심 있을 만한 포스트</Title>
        <Wrapper>
          <PostCardGrid posts={postWithAds} forPost />
        </Wrapper>
      </Background>
      <PullUp />
    </>
  );
}

const Title = styled.div`
  text-align: center;

  font-size: 2rem;
  font-weight: 400;
  color: ${palette.gray7};
  margin-bottom: 3.5rem;
  ${media.custom(1376)} {
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }
  ${media.medium} {
    font-size: 1.25rem;
  }
`;

const Background = styled.div`
  z-index: 30;
  position: relative;
  padding-top: 4rem;
  padding-bottom: 4rem;

  ${media.custom(1376)} {
    padding-top: 2rem;
    padding-bottom: 1rem;
  }
  margin-top: 4rem;
  background: ${palette.gray0};
  box-shadow: 0px 0 32px rgb(0 0 0 / 8%);
`;
const Wrapper = styled.div`
  width: 1376px;
  margin: 0 auto;
  padding-bottom: 3rem;
  ${media.xlarge} {
    width: 1024px;
  }
  ${media.custom(1056)} {
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const PullUp = styled.div`
  margin-bottom: -4rem;
`;

export default RelatedPost;
