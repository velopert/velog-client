import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from 'react-testing-library';
import VelogPageTemplate, {
  VelogPageTemplateProps,
} from '../VelogPageTemplate';
import renderWithRedux from '../../../lib/renderWithRedux';

describe('VelogPageTemplate', () => {
  const setup = (props: Partial<VelogPageTemplateProps> = {}) => {
    const initialProps: VelogPageTemplateProps = {};
    const utils = renderWithRedux(
      <MemoryRouter>
        <VelogPageTemplate {...initialProps} {...props} />
      </MemoryRouter>,
    );
    return {
      ...utils,
    };
  };
  it('renders Header', () => {
    const { getByTestId } = setup();
    getByTestId('Header');
  });
});
