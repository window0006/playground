import React, { useRef, Children, useEffect } from 'react';
import useDrag from 'src/hooks/useDrag';

export interface IPoint {
  x?: number;
  y?: number;
}

export const Dragable: React.FunctionComponent = (props) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const { children } = props;

  useEffect(() => {
    const $element = elementRef.current;
    const $container = document.body;
    if (!$element) {
      return;
    }
    const {
      onDragStart,
      onDragMove,
      onDragEnd
    } = useDrag($element);

    $element.style.cursor = 'move';
    $element.addEventListener('mousedown', onDragStart);
    $container.addEventListener('mousemove', onDragMove);
    $container.addEventListener('mouseup', onDragEnd);
    $container.addEventListener('mouseleave', onDragEnd);

    return () => {
      $element.removeEventListener('mousedown', onDragStart);
      $container.removeEventListener('mousemove', onDragMove);
      $container.removeEventListener('mouseup', onDragEnd);
      $container.removeEventListener('mouseleave', onDragEnd);
    };
  });

  return (
    <div
      ref={elementRef}
      className="drag-wrapper"
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
