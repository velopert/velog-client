import React, { useEffect } from 'react';
import styled from 'styled-components';
import PageTemplate from '../components/base/PageTemplate';
import SettingUserProfileContainer from '../containers/setting/SettingUserProfileContainer';
import SettingRowsContainer from '../containers/setting/SettingRowsContainer';
import media from '../lib/styles/media';
import { Helmet } from 'react-helmet-async';

export type SettingPageProps = {};

function SettingPage(props: SettingPageProps) {
  useEffect(() => {
    window.location.href = `${process.env.REACT_APP_CLIENT_V3_HOST!}/setting`;
  }, []);

  return (
    <SettingTemplate>
      <Helmet>
        <title>설정 - velog</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <main>
        <SettingUserProfileContainer />
        <SettingRowsContainer />
      </main>
    </SettingTemplate>
  );
}

const SettingTemplate = styled(PageTemplate)`
  main {
    margin-top: 3rem;
    margin-left: auto;
    margin-right: auto;
    width: 768px;
    padding-bottom: 5rem;
    ${media.medium} {
      padding-left: 1rem;
      padding-right: 1rem;
    }
    ${media.small} {
      width: 100%;
      margin-top: 1.5rem;
    }
  }
`;

export default SettingPage;
