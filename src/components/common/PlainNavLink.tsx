import React, { HTMLProps, CSSProperties } from 'react';
import { NavLink } from 'react-router-dom';

type PlainNavLink = HTMLProps<HTMLAnchorElement> & {
  to: string;
  activeClassName?: string;
  activeStyle?: CSSProperties;
  exact?: boolean;
};

/**
 * Needed when StyledLink has a custom props
 */
const PlainNavLink: React.FC<PlainNavLink> = ({
  to,
  activeClassName,
  activeStyle,
  className,
  children,
  onClick,
  exact,
}) => {
  return (
    <NavLink
      to={to}
      className={className}
      onClick={onClick}
      activeClassName={activeClassName}
      activeStyle={activeStyle}
      exact={exact}
    >
      {children}
    </NavLink>
  );
};

export default PlainNavLink;
