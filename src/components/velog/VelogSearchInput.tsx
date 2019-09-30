import React from 'react';
import styled from 'styled-components';
import SearchInput from '../search/SearchInput';

const Section = styled.section`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 2rem;
`;

export interface VelogSearchInputProps {
  onSearch: (keyword: string) => void;
  initial: string;
}

function VelogSearchInput(props: VelogSearchInputProps) {
  return (
    <Section>
      <SearchInput searchAsYouType={true} {...props} />
    </Section>
  );
}

export default VelogSearchInput;
