import React, { useState, useEffect } from 'react';
import ErrorScreenTemplate from './ErrorScreenTemplate';
import { undrawUpdate } from '../../static/images';
import { useNetwork } from 'react-use';
import apiClient from '../../lib/api/apiClient';
import NetworkErrorScreen from './NetworkErrorScreen';

export type ChunkErrorScreenProps = {};

async function checkNetwork() {
  try {
    await apiClient.get('/api/v2/check', {
      timeout: 5000,
    });
    return true;
  } catch (e) {
    return false;
  }
}

function ChunkErrorScreen(props: ChunkErrorScreenProps) {
  const [networkStatus, setNetworkStatus] = useState<
    'offline' | 'online' | null
  >(null);

  const network = useNetwork();

  console.log(networkStatus);

  useEffect(() => {
    if (network && network.online !== undefined) {
      setNetworkStatus(network.online ? 'online' : 'offline');
    }
  }, [network]);

  useEffect(() => {
    const fn = async () => {
      const online = await checkNetwork();
      setNetworkStatus(online ? 'online' : 'offline');
    };
    fn();
  }, [network.online]);

  if (networkStatus === null) return null;
  if (networkStatus === 'online') {
    return (
      <ErrorScreenTemplate
        image={undrawUpdate}
        message={
          '벨로그가 업데이트 되었습니다. \n새로고침 후 다시 시도해주세요.'
        }
        onButtonClick={() => window.location.reload()}
        buttonText="새로고침"
      />
    );
  }
  return <NetworkErrorScreen />;
}

export default ChunkErrorScreen;
