import React from 'react';
import styled, { css } from 'styled-components';
import { themedPalette } from '../../lib/styles/themes';
import palette from '../../lib/styles/palette';

const SelectableListBlock = styled.ul`
  padding-left: 0;
  list-style: none;
  margin: 0;
  background: ${themedPalette.bg_element7};
  overflow-y: auto;
`;

const ListItem = styled.li<{ active: boolean }>`
  padding: 0.875rem 1rem;
  font-size: 1rem;
  line-height: 1;
  color: ${themedPalette.text2};
  border-bottom: 1px solid ${themedPalette.border3};

  ${(props) =>
    props.active &&
    css`
      background: ${themedPalette.primary1};
      color: ${themedPalette.button_text};
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

const SelectableList: React.ComponentType<SelectableListProps> =
  React.forwardRef(
    (
      { list, selectedId, className, onChangeId }: SelectableListProps,
      ref: React.Ref<HTMLUListElement>,
    ) => {
      return (
        <SelectableListBlock className={className} ref={ref}>
          {list.map((item) => (
            <ListItem
              className="list-item"
              active={item.id === selectedId}
              key={item.id}
              onClick={() => onChangeId(item.id)}
            >
              {item.text}
            </ListItem>
          ))}
        </SelectableListBlock>
      );
    },
  );

export default SelectableList;
