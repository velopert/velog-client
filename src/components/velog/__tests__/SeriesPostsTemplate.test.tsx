import * as React from 'react';
import { render } from '@testing-library/react';
import SeriesPostsTemplate, {
  SeriesPostsTemplateProps,
} from '../SeriesPostsTemplate';

describe('SeriesPostsTemplate', () => {
  const setup = (props: Partial<SeriesPostsTemplateProps> = {}) => {
    const initialProps: SeriesPostsTemplateProps = {
      name: '시리즈 이름',
    };
    const utils = render(<SeriesPostsTemplate {...initialProps} {...props} />);
    return {
      ...utils,
    };
  };
  it('renders properly', () => {
    const { getByText } = setup();
    getByText('시리즈 이름');
  });
});
