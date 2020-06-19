import React, { useState, Children } from 'react';

export interface IPoint {
  x?: number;
  y?: number;
}

const Dragable: React.FunctionComponent<{
  startPoint
}> = (props) => {
  const {
    startPoint,
    children
  } = props;

  const {
    onDragStart,
    onDragEnd,
    onDragMove
  } = (function (ref) {
    let isDraging = false;
    const distance = {
      x: 0,
      y: 0
    };

    const startAt: IPoint = {
      x: 0,
      y: 0
    };

    const onDragStart = (e: React.TouchEvent) => {
      const { pageX, pageY } = e.touches[0];

      isDraging = true;
      distance.x = 0;
      distance.y = 0;

      startAt.x = pageX;
      startAt.y = pageY;
      
      const getPosition();
    }

    const onDragEnd = (e: React.TouchEvent) => {
      isDraging = false;
      distance.x = 0;
      distance.y = 0;
      startAt.x = 0;
      startAt.y = 0;
    }

    const onDragMove = (e: React.TouchEvent) => {
      if (!isDraging) {
        return;
      }
      const { pageX, pageY } = e.touches[0];

      // 获取拖动的距离
      distance.x = pageX - startAt.x;
      distance.y = pageY - startAt.y;
      
      // 计算当前的位置
 
    }

    return {
      onDragStart,
      onDragEnd,
      onDragMove
    };
  })(ref);

  // ?? React.cloneElement 会如何影响已有的属性？比如传入的child有onClick，如何在元素上绑定onClick，避免影响组件上已绑定的onClick
  return (
    <div
      onMouseDown={}
      onMouseMove={}
      onMouseUp={}
      onMouseLeave={}
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
