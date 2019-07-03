import React from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';

const SelectableListBlock = styled.ul`
  padding-left: 0;
  list-style: none;
  margin: 0;
  background: white;
`;

const ListItem = styled.li<{ active: boolean }>`
  padding: 0.875rem 1rem;
  font-size: 1rem;
  line-height: 1;
  color: ${palette.gray7};
  border-bottom: 1px solid ${palette.gray2};

  ${props =>
    props.active &&
    css`
      background: ${palette.teal6};
      color: white;
    `};
`;

export interface SelectableListProps {
  list: {
    id: string | number;
    text: string;
  }[];
  selectedId: string | number | null;
  className?: string;
  onChangeId: (id: any) => void;
}

const SelectableList: React.FC<SelectableListProps> = ({
  className,
  list,
  selectedId,
  onChangeId,
}) => {
  return (
    <SelectableListBlock className={className}>
      {list.map(item => (
        <ListItem
          active={item.id === selectedId}
          key={item.id}
          onClick={() => onChangeId(item.id)}
        >
          {item.text}
        </ListItem>
      ))}
    </SelectableListBlock>
  );
};

export default SelectableList;
