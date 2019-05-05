import * as React from 'react';
import { render } from 'react-testing-library';
import PublishScreenTemplate, {
  PublishScreenTemplateProps,
} from '../PublishScreenTemplate';

describe('PublishScreenTemplate', () => {
  const setup = (props: Partial<PublishScreenTemplateProps> = {}) => {
    const initialProps: PublishScreenTemplateProps = {
      visible: true,
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
  it('is not visible when visible is false', () => {
    const utils = setup({ visible: false });
    expect(utils.queryByText('left')).toBeFalsy();
  });
  it('shows left and right', () => {
    const utils = setup();
    utils.getByText('left');
    utils.getByText('right');
  });
});
