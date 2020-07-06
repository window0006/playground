import { useEffect, useState } from 'react';

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


  return [

  ];
}