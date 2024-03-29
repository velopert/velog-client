import * as React from 'react';
import styled from 'styled-components';
import { themedPalette } from '../../lib/styles/themes';
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
    color: ${themedPalette.text3};
    a {
      color: inherit;
      text-decoration: none;
    }

    a + a:before {
      content: ' · ';
    }
  }
  .copyright {
    color: ${themedPalette.text3};
  }
`;

interface HomeRightFooterProps {}

const HomeRightFooter: React.FC<HomeRightFooterProps> = (props) => {
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

export default HomeRightFooter;
