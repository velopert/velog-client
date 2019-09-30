import React, { useCallback } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import VelogSearchInput from '../../components/velog/VelogSearchInput';

export interface VelogSearchInputContainerProps extends RouteComponentProps {
  initial: string;
  username: string;
}

function VelogSearchInputContainer({
  history,
  initial,
  username,
}: VelogSearchInputContainerProps) {
  const onSearch = useCallback(
    (keyword: string) => {
      let nextUrl = `/@${username}`;
      if (keyword) {
        nextUrl += `/?q=${keyword}`;
      }
      history.replace(nextUrl);
    },
    [history, username],
  );

  return <VelogSearchInput initial={initial} onSearch={onSearch} />;
}

export default withRouter(VelogSearchInputContainer);
