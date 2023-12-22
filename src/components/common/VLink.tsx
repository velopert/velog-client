import React from 'react';
import styled from 'styled-components';

type Props = {
  to: string;
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
};

function VLink({ to, children, className = '', style }: Props) {
  const url = `${process.env.REACT_APP_CLIENT_V3_HOST}${to}`;
  return (
    <Link href={url} className={className} style={style}>
      {children}
    </Link>
  );
}

const Link = styled.a`
  color: inherit;
  text-decoration: none;
`;

export default VLink;
