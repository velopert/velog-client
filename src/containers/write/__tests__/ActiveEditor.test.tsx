import * as React from 'react';
import ActiveEditor, { ActiveEditorProps } from '../ActiveEditor';
import renderWithProviders from '../../../lib/renderWithProviders';
import { HelmetProvider } from 'react-helmet-async';

describe('ActiveEditor', () => {
  const setup = (props: Partial<ActiveEditorProps> = {}) => {
    const utils = renderWithProviders(
      <HelmetProvider>
        <ActiveEditor {...props} />
      </HelmetProvider>,
    );
    return {
      ...utils,
    };
  };
  it('renders properly', () => {
    const utils = setup();
    utils.getByTestId('codemirror'); // initial mode: WYSIWYG
  });
  it('matches snapshot', () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });
  // it('converts editor properly', async () => {
  //   const { getByTestId, getByText } = setup({});
  //   const convertButton = getByTestId('quillconvert');
  //   fireEvent.click(convertButton);
  //   const confirmButton = getByText('확인');
  //   fireEvent.click(confirmButton);
  //   getByTestId('quill');
  // });
});
