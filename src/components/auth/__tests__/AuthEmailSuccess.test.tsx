import * as React from 'react';
import { render } from 'react-testing-library';
import AuthEmailSuccess, { AuthEmailSuccessProps } from '../AuthEmailSuccess';

describe('AuthEmailSuccess', () => {
  const setup = (props: Partial<AuthEmailSuccessProps> = {}) => {
    const initialProps: AuthEmailSuccessProps = {
      registered: false,
    };
    return render(<AuthEmailSuccess {...initialProps} {...props} />);
  };
  it('renders properly', () => {
    setup();
  });

  it('registered is true', () => {
    const { getByText } = setup({
      registered: true,
    });
    getByText(/로그인 링크가/);
  });

  it('registered is false', () => {
    const { getByText } = setup({
      registered: false,
    });
    getByText(/회원가입 링크가/);
  });
});
