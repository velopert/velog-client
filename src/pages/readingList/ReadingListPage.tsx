import React from 'react';
import MainPageTemplate from '../../components/main/MainPageTemplate';
import MainResponsive from '../../components/main/MainResponsive';
import ReadingListTab from '../../components/readingList/ReadingListTab';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router-dom';
import useReadingList from './hooks/useReadingList';
import PostCardGrid, {
  PostCardGridSkeleton,
} from '../../components/common/PostCardGrid';

export type ReadingListPageProps = {} & RouteComponentProps<{
  type: 'liked' | 'read';
}>;

function ReadingListPage({ match }: ReadingListPageProps) {
  const { type } = match.params;

  const { data, loading, isFinished } = useReadingList(type);

  return (
    <MainPageTemplate>
      <StyledResponsive>
        <ReadingListTab type={type} />
        <Wrapper>
          <PostCardGrid posts={data?.readingList || []} loading={!isFinished} />
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

export default ReadingListPage;
