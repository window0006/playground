import { useEffect, useState, MouseEventHandler, TouchEventHandler } from 'react';

interface IPoint {
  x: number;
  y: number;
}

export default () => {
  let isDraging = false;
  const distance = {
    x: 0,
    y: 0
  };

  const startAt: IPoint = {
    x: 0,
    y: 0
  };

  const onDragStart: MouseEventHandler = e => {
    const { pageX, pageY } = e;

    isDraging = true;
    distance.x = 0;
    distance.y = 0;

    startAt.x = pageX;
    startAt.y = pageY;
  }

  const onDragEnd: MouseEventHandler = () => {
    isDraging = false;
    distance.x = 0;
    distance.y = 0;
    startAt.x = 0;
    startAt.y = 0;
  }

  const onDragMove: MouseEventHandler = (e) => {
    if (!isDraging) {
      return;
    }
    const { pageX, pageY } = e;

    // 获取拖动的距离
    distance.x = pageX - startAt.x;
    distance.y = pageY - startAt.y;

    // 计算当前的位置

  }

  return {
    onDragStart,
    onDragEnd,
    onDragMove,
  };
}