import * as React from 'react';
import { render } from 'react-testing-library';
import PublishScreenTemplate, {
  PublishScreenTemplateProps,
} from '../PublishScreenTemplate';

describe('PublishScreenTemplate', () => {
  const setup = (props: Partial<PublishScreenTemplateProps> = {}) => {
    const initialProps: PublishScreenTemplateProps = {
      left: 'left',
      right: 'right',
    };
    const utils = render(
      <PublishScreenTemplate {...initialProps} {...props} />,
    );
    return {
      ...utils,
    };
  };
  it('renders properly', () => {
    setup();
  });
  it('matches snapshot', () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });
  it('shows left and right', () => {
    const utils = setup();
    utils.getByText('left');
    utils.getByText('right');
  });
});
