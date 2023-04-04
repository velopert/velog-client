import React from 'react';
import styled from 'styled-components';
import useUser from '../../lib/hooks/useUser';
import media from '../../lib/styles/media';
import { themedPalette } from '../../lib/styles/themes';
import { Logo } from '../../static/svg';
import AuthForm from '../auth/AuthForm';
import Button from '../common/Button';
import { useMutation } from '@apollo/react-hooks';
import {
  ACCEPT_INTEGRATION,
  AcceptIntegrationResponse,
} from '../../lib/graphql/user';

function UserIntegrateTemplate() {
  const user = useUser();
  const [acceptIntegration] =
    useMutation<AcceptIntegrationResponse>(ACCEPT_INTEGRATION);

  return (
    <Block>
      <Content>
        <LogoWrapper>
          <Logo />
        </LogoWrapper>
        {user ? (
          <IntegrateContent>
            <h3>회원 연동</h3>
            <p>Codenary에 다음 정보를 제공하시겠습니까?</p>
            <div>
              <DataList>
                <DataRow>
                  <h4>프로필</h4>
                  <div className="info">계정명, 프로필 사진, 이름</div>
                </DataRow>
                <DataRow>
                  <h4>포스트</h4>
                  <div className="info">전체 공개로 출간한 포스트</div>
                </DataRow>
              </DataList>
            </div>
            <div className="footer">
              <Button
                size="large"
                onClick={async () => {
                  const result = await acceptIntegration();
                  if (!result.data) return;
                  window.location.href = `https://api-dev.codenary.co.kr/contents/velog/callback?code=${result.data.acceptIntegration}`;
                }}
              >
                승인
              </Button>
            </div>
          </IntegrateContent>
        ) : (
          <AuthForm
            mode="LOGIN"
            onToggleMode={() => {}}
            onSendAuthEmail={() => {}}
            loading={false}
            registered={null}
            currentPath="/user-integrate"
            isIntegrate
          />
        )}
      </Content>
    </Block>
  );
}

const LogoWrapper = styled.div`
  width: 100%;
  padding-top: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Block = styled.div`
  width: 100%;
  height: 100%;
  display: flex;

  justify-content: center;
`;

const Content = styled.div`
  width: 400px;
  ${media.custom(440)} {
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const IntegrateContent = styled.div`
  padding-top: 32px;
  h3 {
    font-size: 1.3125rem;
    color: ${themedPalette.text1};
  }
  .footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 24px;
  }
`;

const DataList = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
`;
const DataRow = styled.div`
  border-radius: 0.25rem;
  background: ${themedPalette.bg_element2};
  padding: 1rem;
  h4 {
    color: ${themedPalette.text1};
    margin: 0;
    font-size: 1rem;
  }
  .info {
    color: ${themedPalette.text2};
    margin-top: 0.5rem;
    font-size: 0.875rem;
  }
`;

export default UserIntegrateTemplate;
