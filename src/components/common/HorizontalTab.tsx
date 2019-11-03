import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import palette from '../../lib/styles/palette';
import { useSpring, animated } from 'react-spring';

export type HorizontalTabProps = {
  className?: string;
  children: React.ReactElement<TabItemProps>[];
  activeTab: string;
  tabWidth: number;
};

function HorizontalTab({
  className,
  children,
  activeTab,
  tabWidth,
}: HorizontalTabProps) {
  const activeIndex = React.Children.toArray(children).findIndex(
    tab => tab.props.name === activeTab,
  );

  const ratio = 100 / children.length;

  const springStyle = useSpring({
    transform: `translateX(${tabWidth * activeIndex}rem)`,
    width: `${ratio}%`,
    config: {
      friction: 16,
      tensiton: 160,
    },
  });

  return (
    <Block className={className}>
      <div className="tab-wrapper">
        {React.Children.map(children, tab => {
          return React.cloneElement(tab, {
            active: tab.props.name === activeTab,
            width: `${tabWidth}rem`,
          });
        })}
        <Indicator style={springStyle} />
      </div>
    </Block>
  );
}

HorizontalTab.defaultProps = {
  tabWidth: 8,
};

export type TabItemProps = {
  name: string;
  text: string;
  to: string;
  active?: boolean;
  width?: string;
};

function TabItem({ name, text, to, active, width }: TabItemProps) {
  return (
    <StyledLink to={to} className={active ? 'active' : ''} style={{ width }}>
      {text}
    </StyledLink>
  );
}

const Block = styled.div`
  display: flex;
  justify-content: center;
  .tab-wrapper {
    display: flex;
    position: relative;
  }
`;

const Indicator = styled(animated.div)`
  height: 2px;
  display: block;
  position: absolute;
  bottom: 0px;
  background: ${palette.teal5};
`;

const StyledLink = styled(Link)`
  width: 8rem;
  height: 3rem;
  font-size: 1.3125rem;
  color: ${palette.gray7};
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;

  &.active {
    font-weight: bold;
    color: ${palette.teal5};
  }
`;

HorizontalTab.TabItem = TabItem;
export default HorizontalTab;
