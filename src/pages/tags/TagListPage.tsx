import React from 'react';
import HorizontalTab from '../../components/common/HorizontalTab';
import { useLocation, useHistory } from 'react-router';
import qs from 'qs';
import DetailedTagListContainer from '../../containers/tags/DetailedTagListContainer';
import { Helmet } from 'react-helmet-async';

const { TabItem } = HorizontalTab;

export type TagsPageProps = {};

function TagListPage(props: TagsPageProps) {
  const location = useLocation();
  const history = useHistory();
  const { sort = 'trending' } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  const validSort = ['trending', 'alphabetical'].includes(sort);
  if (!validSort) {
    history.replace('/tags?sort=trending');
  }

  const sortText = sort === 'trending' ? '인기순' : '이름순';
  return (
    <>
      <Helmet>
        <title>태그 ({sortText}) - velog</title>
        <meta
          name="description"
          content={`벨로그에 작성된 포스트들에서 사용된 모든 태그들을 ${sortText}으로 확인해보세요.`}
        />
      </Helmet>
      <HorizontalTab activeTab={sort}>
        <TabItem to="/tags?sort=trending" name="trending" text="인기순" />
        <TabItem
          to="/tags?sort=alphabetical"
          name="alphabetical"
          text="이름순"
        />
      </HorizontalTab>
      <DetailedTagListContainer sort={sort} />
    </>
  );
}

export default TagListPage;
