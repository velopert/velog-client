import React from 'react';
import styled from 'styled-components';
import ErrorScreenTemplate from './ErrorScreenTemplate';
import { undrawBugFixing } from '../../static/images';
import { useHistory } from 'react-router-dom';

export type CrashErrorScreenProps = {};

function CrashErrorScreen(props: CrashErrorScreenProps) {
  const history = useHistory();
  return (
    <ErrorScreenTemplate
      image={undrawBugFixing}
      message="엇! 오류가 발생했습니다."
      buttonText="홈으로"
      onButtonClick={() => history.push('/')}
    />
  );
}

export default CrashErrorScreen;
