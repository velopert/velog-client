import React from 'react';
import MainPageTemplate from '../../components/main/MainPageTemplate';
import MainResponsive from '../../components/main/MainResponsive';
import ReadingListTab from '../../components/readingList/ReadingListTab';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router-dom';
import useReadingList from './hooks/useReadingList';
import PostCardGrid from '../../components/common/PostCardGrid';
import { undrawEmpty } from '../../static/images';
import palette from '../../lib/styles/palette';
import media from '../../lib/styles/media';
import { Helmet } from 'react-helmet-async';

export type ReadingListPageProps = {} & RouteComponentProps<{
  type: 'liked' | 'read';
}>;

function ReadingListPage({ match, history }: ReadingListPageProps) {
  const { type } = match.params;

  const { data, isFinished } = useReadingList(type);

  return (
    <MainPageTemplate>
      <Helmet>
        {<meta name="robots" content="noindex" />}
        <title>읽기 목록 - velog</title>
      </Helmet>
      <StyledResponsive>
        <ReadingListTab type={type} />
        <Wrapper>
          <PostCardGrid posts={data?.readingList || []} loading={!isFinished} />
          {data && data.readingList.length === 0 && (
            <EmptyWrapper>
              <img src={undrawEmpty} alt="list is empty" />
              <div className="description">리스트가 비어있습니다.</div>
            </EmptyWrapper>
          )}
        </Wrapper>
      </StyledResponsive>
    </MainPageTemplate>
  );
}

const StyledResponsive = styled(MainResponsive)`
  margin-top: 1.5rem;
`;

const Wrapper = styled.div`
  margin-top: 2rem;
`;

const EmptyWrapper = styled.div`
  margin-top: 6rem;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  img {
    width: 25rem;
    height: auto;
    display: block;
    margin-bottom: 2rem;
  }

  .description {
    color: ${palette.gray7};
    font-size: 1.5rem;
  }

  ${media.small} {
    margin-top: 3rem;
    img {
      max-width: 300px;
      width: calc(100% - 2rem);
      margin-bottom: 1rem;
    }
    .description {
      font-size: 1.25rem;
    }
  }
`;

export default ReadingListPage;
