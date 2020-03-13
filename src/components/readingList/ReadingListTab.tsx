import React from 'react';
import HorizontalTab from '../common/HorizontalTab';

export type ReadingListTabProps = {
  type: 'liked' | 'read';
};

function ReadingListTab({ type }: ReadingListTabProps) {
  return (
    <HorizontalTab activeTab={type} tabWidth={9} align="left" theme="gray">
      <HorizontalTab.TabItem
        to="/lists/liked"
        name="liked"
        text="좋아한 포스트"
      />
      <HorizontalTab.TabItem
        to="/lists/read"
        name="read"
        text="최근 읽은 포스트"
      />
    </HorizontalTab>
  );
}

export default ReadingListTab;
