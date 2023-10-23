import * as React from 'react';
import styled from 'styled-components';
import media from '../../lib/styles/media';

const VelogResponsiveBlock = styled.div`
  width: 768px;
  margin-left: auto;
  margin-right: auto;
  ${media.small} {
    width: 100%;
  }
`;

export interface VelogResponsiveProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const VelogResponsive: React.FC<VelogResponsiveProps> = ({
  children,
  className,
  style,
  onClick,
}) => {
  return (
    <VelogResponsiveBlock
      children={children}
      className={className}
      style={style}
      onClick={onClick}
    />
  );
};

export default VelogResponsive;
