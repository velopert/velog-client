import * as React from 'react';
import styled from 'styled-components';
import { themedPalette } from '../../lib/styles/themes';
import palette from '../../lib/styles/palette';

const PublishSectionBlock = styled.section`
  & > h3 {
    font-size: 1.3125rem;
    color: ${themedPalette.text1};
    line-height: 1.5;
    margin-bottom: 0.5rem;
    margin-top: 0;
  }
  .contents {
  }

  & + & {
    margin-top: 1.5rem;
  }
`;

export interface PublishSectionProps extends React.HTMLProps<HTMLElement> {
  title: string;
  children: React.ReactNode;
}

const PublishSection: React.FC<PublishSectionProps> = ({
  title,
  children,
  ...rest
}) => {
  const htmlProps = rest as any;
  return (
    <PublishSectionBlock {...htmlProps}>
      <h3>{title}</h3>
      <div className="contents">{children}</div>
    </PublishSectionBlock>
  );
};

export default PublishSection;
