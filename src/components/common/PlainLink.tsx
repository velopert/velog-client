import React, { HTMLProps } from 'react';
import { Link } from 'react-router-dom';

type PlainLinkProps = HTMLProps<HTMLAnchorElement> & {
  to: string;
};

/**
 * Needed when StyledLink has a custom props
 */
const PlainLink: React.FC<PlainLinkProps> = ({
  to,
  className,
  children,
  onClick,
}) => {
  return (
    <Link to={to} className={className} onClick={onClick}>
      {children}
    </Link>
  );
};

export default PlainLink;
