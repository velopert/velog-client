import React from 'react';
import VelogPageTemplate from '../../components/velog/VelogPageTemplate';
import { useParams } from 'react-router';
import useApplyVelogConfig from './hooks/useApplyVelogConfig';

export type VelogPageFallbackProps = {};

function VelogPageFallback(props: VelogPageFallbackProps) {
  const params = useParams<{ username: string }>();
  useApplyVelogConfig(params.username);
  return <VelogPageTemplate></VelogPageTemplate>;
}

export default VelogPageFallback;
