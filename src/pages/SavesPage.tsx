import React from 'react';
import SavesTemplate from '../components/saves/SavesTemplate';
import SavedPosts from '../components/saves/SavedPosts';
import { Helmet } from 'react-helmet-async';

export interface SavesPageProps {}

function SavesPage(props: SavesPageProps) {
  return (
    <SavesTemplate>
      <Helmet>
        <title>임시 글 목록 - velog</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <SavedPosts />
    </SavesTemplate>
  );
}

export default SavesPage;
