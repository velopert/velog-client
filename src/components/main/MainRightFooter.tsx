import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';

const MainRightFooterBlock = styled.div`
  margin-top: 6.25rem;
  line-height: 1.5;
  font-size: 0.875rem;
  .links {
    color: ${palette.gray6};
    a {
      color: inherit;
      text-decoration: none;
    }

    a + a:before {
      content: ' · ';
    }
  }
  .copyright {
    color: ${palette.gray5};
  }
`;

interface MainRightFooterProps {}

const MainRightFooter: React.SFC<MainRightFooterProps> = props => {
  return (
    <MainRightFooterBlock>
      <div className="links">
        <a>소개</a>
        <a>서비스 정책</a>
        <a>FAQ</a>
      </div>
      <div className="copyright">© 2019 · velog</div>
    </MainRightFooterBlock>
  );
};

export default MainRightFooter;
