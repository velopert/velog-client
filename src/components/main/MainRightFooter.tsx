import * as React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { Link } from 'react-router-dom';
import media from '../../lib/styles/media';

const MainRightFooterBlock = styled.div`
  margin-top: 6.25rem;
  ${media.medium} {
    margin-top: 3rem;
  }
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
        <a href="mailto:contact@velog.io">문의</a>
        <a
          href="https://bit.ly/velog-slack"
          target="_blank"
          rel="noopener noreferrer"
        >
          Slack 채널
        </a>
        <Link to="/policy/terms">서비스 정책</Link>
        {/* <div className="contact">
          <div className="email">문의 - contact@velog.io</div>
        </div> */}
      </div>
      <div className="copyright">© 2020 · velog</div>
    </MainRightFooterBlock>
  );
};

export default MainRightFooter;
