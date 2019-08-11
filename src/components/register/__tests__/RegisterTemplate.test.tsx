import * as React from 'react';
import { render } from '@testing-library/react';
import RegisterTemplate, { RegisterTemplateProps } from '../RegisterTemplate';

describe('RegisterTemplate', () => {
  const setup = (props: Partial<RegisterTemplateProps> = {}) => {
    const initialProps: RegisterTemplateProps = {
      registered: false,
    };
    return render(<RegisterTemplate {...initialProps} {...props} />);
  };
  it('renders properly', () => {
    setup();
  });
  it('matches snapshot', () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });
});
