import React from 'react';
import styled from 'styled-components';
import PageTemplate from '../../components/base/PageTemplate';
import { Route } from 'react-router';
import TagListPage from './TagListPage';
import TagDetailPage from './TagDetailPage';
import media from '../../lib/styles/media';

export type TagsPageProps = {};

const TagsTemplate = styled(PageTemplate)`
  main {
    margin-top: 3rem;
    ${media.medium} {
      margin-top: 1rem;
    }
    ${media.small} {
      margin-top: 0rem;
    }
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
