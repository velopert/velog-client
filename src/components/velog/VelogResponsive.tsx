import * as React from 'react';
import styled from 'styled-components';
import media from '../../lib/styles/media';

const VelogResponsiveBlock = styled.div`
  width: 768px;
  margin-left: auto;
  margin-right: auto;

  ${media.small} {
    width: 100%;
    max-height: 400px;
  }
`;

export interface VelogResponsiveProps {
  className?: string;
  style?: React.CSSProperties;
}

const VelogResponsive: React.FC<VelogResponsiveProps> = ({
  children,
  className,
  style,
}) => {
  return (
    <VelogResponsiveBlock
      children={children}
      className={className}
      style={style}
    />
  );
};

export default VelogResponsive;
