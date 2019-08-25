import React from 'react';
import SeriesPostsTemplate from '../../components/velog/SeriesPostsTemplate';
import SeriesSorterAligner from '../../components/velog/SeriesSorterAligner';
import SorterButton from '../../components/common/SorterButton';
import SeriesPostList from '../../components/velog/SeriesPostList';

export interface SeriesPostsProps {
  username: string;
  urlSlug: string;
}

const SeriesPosts: React.FC<SeriesPostsProps> = props => {
  return (
    <SeriesPostsTemplate>
      <SeriesSorterAligner>
        <SorterButton value={-1} onToggle={() => {}} />
      </SeriesSorterAligner>
      <SeriesPostList />
    </SeriesPostsTemplate>
  );
};

export default SeriesPosts;
