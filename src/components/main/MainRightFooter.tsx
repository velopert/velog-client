import * as React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { Link } from 'react-router-dom';

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

const MainRightFooter: React.FC<MainRightFooterProps> = props => {
  return (
    <MainRightFooterBlock>
      <div className="links">
        {/* <Link to="/">소개</Link> */}
        <Link to="/policy/terms">서비스 정책</Link>
        {/* <Link to="/">FAQ</Link> */}
      </div>
      <div className="copyright">© 2020 · velog</div>
    </MainRightFooterBlock>
  );
};

export default MainRightFooter;
