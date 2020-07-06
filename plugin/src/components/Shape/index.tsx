import React, { useState, Children } from 'react';

export interface IPoint {
  x?: number;
  y?: number;
}

const Dragable: React.FunctionComponent = (props) => {
  const {
    children
  } = props;

  const [
    onDrageStart,
    onDrageMove,
    onDrageEnd
  ] = useDrage();

  return (
    <div
      className="drage-wrapper"
      onMouseDown={onDrageStart}
      onMouseMove={onDrageEnd}
      onMouseUp={onDrageMove}
      onMouseLeave={onDrageEnd}
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
