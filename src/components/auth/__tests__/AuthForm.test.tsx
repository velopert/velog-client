import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import AuthForm from '../AuthForm';

describe('AuthForm', () => {
  it('renders correctly', () => {
    const { container } = render(
      <AuthForm mode="REGISTER" onToggleMode={() => {}} />,
    );
    expect(container).toMatchSnapshot();
  });

  describe('handles modes', () => {
    it('REGISTER', () => {
      const { getByText } = render(
        <AuthForm mode="REGISTER" onToggleMode={() => {}} />,
      );
      getByText('회원가입');
    });
    it('LOGIN', () => {
      const { getByText } = render(
        <AuthForm mode="LOGIN" onToggleMode={() => {}} />,
      );
      getByText('로그인');
    });
  });

  it('calls onToggleMode', () => {
    const onToggleMode = jest.fn();
    const { container } = render(
      <AuthForm mode="REGISTER" onToggleMode={onToggleMode} />,
    );
    const anchor = container.querySelector('a');
    expect(anchor).toBeTruthy();
    if (!anchor) return;
    fireEvent.click(anchor);
    expect(onToggleMode.mock.calls.length).toBe(1);
  });
});
