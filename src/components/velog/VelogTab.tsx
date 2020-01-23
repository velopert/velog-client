import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import PlainNavLink from '../common/PlainNavLink';
import media from '../../lib/styles/media';

const VelogTabBlock = styled.div`
  margin-top: 4.5rem;
  margin-bottom: 4.5rem;
  display: flex;
  justify-content: center;
  ${media.small} {
    margin-top: 0;
    margin-bottom: 1.5rem;
  }
`;

const TabWrapper = styled.div`
  display: flex;
  position: relative;
  ${media.small} {
    width: 100%;
  }
`;

const TabItem = styled(PlainNavLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.325rem;
  width: 8rem;
  height: 3rem;
  color: ${palette.gray7};
  text-decoration: none;
  transition: 0.25s color ease-in-out;
  font-weight: 600;
  &.active {
    color: ${palette.teal5};
    /* font-weight: bold; */
  }
  ${media.small} {
    flex: 1;
    font-size: 1rem;
    height: 2.5rem;
  }
`;

const Indicator = styled.div`
  width: 8rem;
  height: 2px;
  background: ${palette.teal5};
  position: absolute;
  bottom: -2px;
  transition: 0.25s left ease-in-out;
  ${media.small} {
    width: 33.3333%;
  }
`;

export interface VelogTabProps {
  username: string;
  tab: 'posts' | 'series' | 'about';
}

const tabIndexMap = {
  posts: 0,
  series: 1,
  about: 2,
};

const VelogTab: React.FC<VelogTabProps> = ({ username, tab }) => {
  const url = `/@${username}`;
  const withPrefix = (path: string) => `${url}/${path}`;
  const tabIndex = tabIndexMap[tab];

  return (
    <VelogTabBlock>
      <TabWrapper>
        <TabItem exact to={url}>
          글
        </TabItem>
        <TabItem exact to={withPrefix('series')}>
          시리즈
        </TabItem>
        <TabItem exact to={withPrefix('about')}>
          소개
        </TabItem>
        <Indicator
          style={{
            left: `${tabIndex * 33.3333}%`,
          }}
        />
      </TabWrapper>
    </VelogTabBlock>
  );
};

export default VelogTab;
