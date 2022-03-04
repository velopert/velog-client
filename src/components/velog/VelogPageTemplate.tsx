import React, { createContext, useContext, useState } from 'react';
import styled from 'styled-components';
import { useTheme } from '../../lib/hooks/useTheme';
import PageTemplate from '../base/PageTemplate';

const VelogPageTemplateBlock = styled(PageTemplate)`
  padding-bottom: 4rem;
`;

export interface VelogPageTemplateProps {}

const FooterContext = createContext<(value: boolean) => void>(() => {});

const VelogPageTemplate: React.FC<VelogPageTemplateProps> = ({ children }) => {
  const [showFooter, setShowFooter] = useState(false);
  return (
    <FooterContext.Provider value={setShowFooter}>
      <VelogPageTemplateBlock>
        {children}
        {showFooter && <GraphCDNFooter />}
      </VelogPageTemplateBlock>
    </FooterContext.Provider>
  );
};

export function useSetShowFooter() {
  return useContext(FooterContext);
}

function GraphCDNFooter() {
  const theme = useTheme();
  const img =
    theme === 'dark'
      ? 'https://graphcdn.io/badge-light.svg'
      : 'https://graphcdn.io/badge.svg';
  return (
    <Block>
      <a href="https://graphcdn.io/?ref=powered-by">
        <img src={img} alt="Powered by GraphCDN, the GraphQL CDN" />
      </a>
    </Block>
  );
}

const Block = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
  position: relative;
  z-index: 50;
  img {
    width: 150px;
    height: auto;
  }
`;

export default VelogPageTemplate;
