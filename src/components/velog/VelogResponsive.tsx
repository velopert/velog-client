import * as React from 'react';
import styled from 'styled-components';
import media from '../../lib/styles/media';

const VelogResponsiveBlock = styled.div`
  width: 768px;
  margin: 0 auto;
  ${media.small} {
    width: 100%;
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
