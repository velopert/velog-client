import React from 'react';
import SavesTemplate from '../components/saves/SavesTemplate';
import SavedPosts from '../components/saves/SavedPosts';

export interface SavesPageProps {}

function SavesPage(props: SavesPageProps) {
  return (
    <SavesTemplate>
      <SavedPosts />
    </SavesTemplate>
  );
}

export default SavesPage;
