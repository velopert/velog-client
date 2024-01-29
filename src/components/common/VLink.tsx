import React from 'react';
import styled from 'styled-components';

type Props = {
  to: string;
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
};

function VLink({ to, children, className = '', style, onClick }: Props) {
  const url = `${process.env.REACT_APP_CLIENT_V3_HOST}${to}`;

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!onClick) return;
    onClick(event);
  };

  return (
    <Link
      href={url}
      className={className}
      style={style}
      onClick={(event) => handleClick(event)}
    >
      {children}
    </Link>
  );
}

const Link = styled.a`
  color: inherit;
  text-decoration: none;
`;

export default VLink;
