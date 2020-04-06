import React from 'react';
import ErrorScreenTemplate from './ErrorScreenTemplate';
import { undrawBugFixing } from '../../static/images';
import { useHistory } from 'react-router-dom';

export type CrashErrorScreenProps = {
  onResolve: () => void;
};

function CrashErrorScreen({ onResolve }: CrashErrorScreenProps) {
  const history = useHistory();
  return (
    <ErrorScreenTemplate
      image={undrawBugFixing}
      message="엇! 오류가 발생했습니다."
      buttonText="홈으로"
      onButtonClick={() => {
        history.push('/');
        onResolve();
      }}
    />
  );
}

export default CrashErrorScreen;
