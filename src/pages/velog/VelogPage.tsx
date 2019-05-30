import * as React from 'react';
import VelogPageTemplate from '../../components/velog/VelogPageTemplate';

export interface VelogPageProps {}

const VelogPage: React.FC<VelogPageProps> = props => {
  return <VelogPageTemplate>HeyThere</VelogPageTemplate>;
};

export default VelogPage;
