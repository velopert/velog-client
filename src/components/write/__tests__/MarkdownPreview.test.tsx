import * as React from 'react';
import { render } from '@testing-library/react';
import MarkdownPreview, { MarkdownPreviewProps } from '../MarkdownPreview';
import { HelmetProvider } from 'react-helmet-async';

describe('MarkdownPreview', () => {
  const setup = (props: Partial<MarkdownPreviewProps> = {}) => {
    const initialProps: MarkdownPreviewProps = {
      markdown: '',
      title: '',
    };
    const utils = render(
      <HelmetProvider>
        <MarkdownPreview {...initialProps} {...props} />
      </HelmetProvider>,
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
  it('renders markdown', () => {
    const utils = setup({
      markdown: '## hello world',
    });
    const element = utils.getByText('hello world');
    expect(element.tagName).toBe('H2');
  });
  it('renders title', () => {
    const utils = setup({
      title: 'this is the title',
    });
    utils.getByText('this is the title');
  });
});
