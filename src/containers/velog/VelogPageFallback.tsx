import React from 'react';
import VelogPageTemplate from '../../components/velog/VelogPageTemplate';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import ConfigLoader from './ConfigLoader';

export type VelogPageFallbackProps = {};

function VelogPageFallback(props: VelogPageFallbackProps) {
  const dispatch = useDispatch();
  const params = useParams<{ username: string }>();

  return (
    <VelogPageTemplate>
      <ConfigLoader username={params.username} />
    </VelogPageTemplate>
  );
}

export default VelogPageFallback;
