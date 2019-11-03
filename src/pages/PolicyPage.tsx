import React from 'react';
import styled from 'styled-components';
import PageTemplate from '../components/base/PageTemplate';
import HorizontalTab from '../components/common/HorizontalTab';
import { RouteComponentProps, Redirect } from 'react-router';
import PolicyViewer from '../components/policy/PolicyViewer';

export type PolicyPageProps = {} & RouteComponentProps<{
  type?: 'privacy' | 'terms';
}>;

const PolicyTemplate = styled(PageTemplate)`
  main {
    margin-top: 3rem;
    margin-left: auto;
    margin-right: auto;
    width: 768px;
    padding-bottom: 5rem;
  }
`;

function PolicyPage({ match }: PolicyPageProps) {
  const { type = 'terms' } = match.params;

  return (
    <PolicyTemplate>
      <main>
        <HorizontalTab activeTab={type} tabWidth={12}>
          <HorizontalTab.TabItem
            to="/policy/terms"
            name="terms"
            text="이용약관"
          />
          <HorizontalTab.TabItem
            to="/policy/privacy"
            name="privacy"
            text="개인정보취급방침"
          />
        </HorizontalTab>
        <PolicyViewer type={type} />
      </main>
      {!type && <Redirect to="/policy/privacy" />}
    </PolicyTemplate>
  );
}

export default PolicyPage;
