import React from 'react';
import HorizontalTab from '../../components/common/HorizontalTab';
import { useLocation, useHistory } from 'react-router';
import qs from 'qs';
import DetailedTagListContainer from '../../containers/tags/DetailedTagListContainer';

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

  return (
    <>
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
