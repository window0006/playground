import React, { useState, Children } from 'react';
import useDrag from 'src/hooks/useDrag';

export interface IPoint {
  x?: number;
  y?: number;
}

const Dragable: React.FunctionComponent = (props) => {
  const {
    children
  } = props;

  const {
    onDragStart,
    onDragMove,
    onDragEnd
  } = useDrag();

  return (
    <div
      className="drag-wrapper"
      onMouseDown={onDragStart}
      onMouseMove={onDragEnd}
      onMouseUp={onDragMove}
      onMouseLeave={onDragEnd}
    >
      {
        Children.only(children)
      }
    </div>
  );
}

const Resizeable: React.FunctionComponent = (props) => {
  return (
    <>
    </>
  );
}

const Connectable: React.FunctionComponent = (props) => {
  return (
    <>
    </>
  );
}

const Shape: React.FunctionComponent = (props) => {
  
  return (
    <>
    </>
  );
}

export default Shape;
