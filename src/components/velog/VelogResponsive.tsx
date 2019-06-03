import * as React from 'react';
import styled from 'styled-components';

const VelogResponsiveBlock = styled.div`
  width: 768px;
  margin: 0 auto;
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
