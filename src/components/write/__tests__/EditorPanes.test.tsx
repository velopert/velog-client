import React from 'react';
import { render } from 'react-testing-library';
import EditorPanes, { EditorPanesProps } from '../EditorPanes';

describe('EditorPanes', () => {
  const setup = (props: Partial<EditorPanesProps> = {}) => {
    const initialProps: EditorPanesProps = {
      theme: 'DARK',
    };

    const utils = render(<EditorPanes {...initialProps} {...props} />);
    const left = utils.getByTestId('left');
    const right = utils.getByTestId('right');
    return {
      ...utils,
      left,
      right,
    };
  };
  it('renders properly', () => {
    setup();
  });
  // it('matches snapshot', () => {
  //   const { container } = setup();
  //   expect(container).toMatchSnapshot();
  // });
  describe('shows different themes', () => {
    it('DARK theme', () => {
      const utils = setup({ theme: 'DARK' });
      expect(utils.left.style.backgroundColor).toBe('rgb(38, 50, 56)');
      expect(utils.right.style.backgroundColor).toBe('white');
    });
    it('LIGHT theme', () => {
      const utils = setup({ theme: 'LIGHT' });
      expect(utils.left.style.backgroundColor).toBe('white');
      expect(utils.right.style.backgroundColor).toBe('rgb(251, 253, 252)');
    });
  });
  it('shows left and right node', () => {
    const utils = setup({ left: 'hello', right: 'world' });
    utils.getByText('hello');
    utils.getByText('world');
  });
});
