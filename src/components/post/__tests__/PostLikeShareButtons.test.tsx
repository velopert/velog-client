import * as React from 'react';
import { render } from 'react-testing-library';
import PostLikeShareButtons, {
  PostLikeShareButtonsProps,
} from '../PostLikeShareButtons';

describe('PostLikeShareButtons', () => {
  const setup = (props: Partial<PostLikeShareButtonsProps> = {}) => {
    const initialProps: PostLikeShareButtonsProps = {};
    const utils = render(<PostLikeShareButtons {...initialProps} {...props} />);
    return {
      ...utils,
    };
  };
  it('renders properly', () => {
    setup();
  });
});
