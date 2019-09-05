import React, { useRef, useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';
import { SeriesPostPreview } from '../../lib/graphql/series';
import SeriesPostItem from './SeriesPostItem';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  ResponderProvided,
} from 'react-beautiful-dnd';

const DraggableSeriesPostList = styled.div`
  margin-top: 2.25rem;
`;

const DroppableBlock = styled.div<{ isDraggingOver: boolean }>`
  background: ${props =>
    props.isDraggingOver ? palette.gray1 : palette.gray0};
  border-radius: 4px;
  padding: 1.5rem;
  padding-bottom: 0.5rem;
`;

const DraggableBlock = styled.div<{ isDragging: boolean }>`
  user-select: none;
  ${props =>
    props.isDragging
      ? css`
          opacity: 0.6;
        `
      : css`
          opacity: 1;
        `}
  margin-bottom: 1rem;
`;

export interface DraggableSeriesListProps {
  seriesPosts: SeriesPostPreview[];
  onChangeSeriesOrder: (order: string[]) => void;
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const nextList = [...list];
  const [removed] = nextList.splice(startIndex, 1);
  nextList.splice(endIndex, 0, removed);
  return nextList;
}

const DraggableSeriesList = ({
  seriesPosts,
  onChangeSeriesOrder,
}: DraggableSeriesListProps) => {
  const [tempPosts, setTempPosts] = useState(seriesPosts);

  const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
    if (!result.destination) return;
    if (result.destination.index === result.source.index) return;
    setTempPosts(prevTempPosts =>
      reorder(prevTempPosts, result.source.index, result.destination!.index),
    );
  };

  useEffect(() => {
    onChangeSeriesOrder(tempPosts.map(tp => tp.id));
  }, [onChangeSeriesOrder, tempPosts]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <DraggableSeriesPostList>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => {
            return (
              <DroppableBlock
                {...provided.droppableProps}
                ref={provided.innerRef}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {tempPosts.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <DraggableBlock
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        isDragging={snapshot.isDragging}
                      >
                        <SeriesPostItem
                          date={item.post.released_at}
                          title={item.post.title}
                          description={item.post.short_description}
                          thumbnail={item.post.thumbnail}
                          index={index + 1}
                          urlSlug={item.post.url_slug}
                          key={item.id}
                          username=""
                          edit
                        />
                      </DraggableBlock>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </DroppableBlock>
            );
          }}
        </Droppable>
      </DraggableSeriesPostList>
    </DragDropContext>
  );
};

export default DraggableSeriesList;
