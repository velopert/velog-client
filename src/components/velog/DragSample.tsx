import React, { useState } from 'react';
import styled from 'styled-components';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';

const initial = Array.from({ length: 10 }, (v, k) => k).map(k => ({
  id: k,
  content: `Message ${k}`,
}));

const reorder = (
  list: typeof initial,
  startIndex: number,
  endIndex: number,
) => {
  const temp = [...list];
  const [removed] = temp.splice(startIndex, 1);
  temp.splice(endIndex, 0, removed);
  return temp;
};

const DragSampleBlock = styled.div``;

export interface DragSampleProps {}

const DragSample = (props: DragSampleProps) => {
  const [list, setList] = useState(initial);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    if (result.destination.index === result.source.index) return;
    setList(reorder(list, result.source.index, result.destination.index));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="sample">
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{ background: 'black' }}
          />
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DragSample;
