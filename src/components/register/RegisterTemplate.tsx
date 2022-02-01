import * as React from 'react';
import styled from 'styled-components';
import { themedPalette } from '../../lib/styles/themes';
import palette from '../../lib/styles/palette';
import media from '../../lib/styles/media';

const RegisterTemplateBlock = styled.div`
  width: 768px;
  margin: 0 auto;
  margin-top: 100px;
  line-height: 1.5;
  h1 {
    font-size: 4rem;
    color: ${themedPalette.text1};
    font-weight: bolder;
    margin: 0;
  }
  .description {
    font-size: 1.5rem;
    color: ${themedPalette.text1};
  }

  ${media.small} {
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
    margin-top: 4rem;
    h1 {
      font-size: 3rem;
    }
    .description {
      font-size: 1rem;
    }
  }
`;

export interface RegisterTemplateProps {}

const RegisterTemplate: React.FC<RegisterTemplateProps> = ({ children }) => {
  return (
    <RegisterTemplateBlock>
      <h1>환영합니다!</h1>
      <div className="description">기본 회원 정보를 등록해주세요.</div>
      <div className="contents">{children}</div>
    </RegisterTemplateBlock>
  );
};

export default RegisterTemplate;
