import * as React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';

const RegisterTemplateBlock = styled.div`
  width: 768px;
  margin: 0 auto;
  margin-top: 100px;
  line-height: 1.5;
  h1 {
    font-size: 4rem;
    color: ${palette.gray9};
    font-weight: bolder;
    margin: 0;
  }
  .description {
    font-size: 1.5rem;
    color: ${palette.gray9};
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
