import React from 'react';
import styled from 'styled-components';
import PageTemplate from '../../components/base/PageTemplate';
import HorizontalTab from '../../components/common/HorizontalTab';
import { useLocation, useHistory, Route } from 'react-router';
import qs from 'qs';
import DetailedTagList from '../../components/tags/DetailedTagList';
import DetailedTagListContainer from '../../containers/tags/DetailedTagListContainer';
import TagListPage from './TagListPage';
import TagDetailPage from './TagDetailPage';

const { TabItem } = HorizontalTab;

export type TagsPageProps = {};

const TagsTemplate = styled(PageTemplate)`
  main {
    margin-top: 3rem;
  }
`;

function TagsPage(props: TagsPageProps) {
  return (
    <TagsTemplate>
      <main>
        <Route path="/tags" exact component={TagListPage} />
        <Route path="/tags/:tag" component={TagDetailPage} />
      </main>
    </TagsTemplate>
  );
}

export default TagsPage;
