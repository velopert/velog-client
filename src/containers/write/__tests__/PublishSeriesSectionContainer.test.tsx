import * as React from 'react';
import PublishSeriesSectionContainer, {
  PublishSeriesSectionContainerProps,
} from '../PublishSeriesSectionContainer';
import renderWithProviders from '../../../lib/renderWithProviders';
import { fireEvent } from 'react-testing-library';

describe('PublishSeriesSectionContainer', () => {
  const setup = (props: Partial<PublishSeriesSectionContainerProps> = {}) => {
    const initialProps: PublishSeriesSectionContainerProps = {};
    const utils = renderWithProviders(
      <PublishSeriesSectionContainer {...initialProps} {...props} />,
    );
    return {
      ...utils,
    };
  };
  it('renders properly', () => {
    const { getByText, store } = setup();
    const button = getByText('시리즈에 추가하기');
    fireEvent.click(button);
    expect(store.getState().write.editSeries).toBe(true);
  });
});
