import * as React from 'react';
import { render } from 'react-testing-library';
import PublishSection, { PublishSectionProps } from '../PublishSection';

describe('PublishSection', () => {
  const setup = (props: Partial<PublishSectionProps> = {}) => {
    const initialProps: PublishSectionProps = {
      title: '섹션 제목',
      children: '섹션 내용',
    };
    const utils = render(<PublishSection {...initialProps} {...props} />);
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
  it('renders title and children', () => {
    const utils = setup();
    utils.getByText('섹션 제목');
    utils.getByText('섹션 내용');
  });
});
