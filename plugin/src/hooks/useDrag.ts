import { useEffect, useState } from 'react';

interface IPoint {
  x: number;
  y: number;
}

export default ($element: HTMLElement) => {
  const offsetInfo = $element.getBoundingClientRect();
  $element.style.position = 'absolute';
  $element.style.left = `${offsetInfo.left}px`;
  $element.style.top = `${offsetInfo.top}px`;

  let isDraging = false;
  const distance = {
    x: 0,
    y: 0
  };

  const startAt: IPoint = {
    x: 0,
    y: 0
  };

  const elementBasePosition: IPoint = {
    x: 0,
    y: 0,
  };

  const onDragStart = (e: MouseEvent) => {
    const { pageX, pageY } = e;

    isDraging = true;
    distance.x = 0;
    distance.y = 0;

    startAt.x = pageX;
    startAt.y = pageY;

    const offsetInfo = $element.getBoundingClientRect();
    elementBasePosition.x = offsetInfo.left;
    elementBasePosition.y = offsetInfo.top;

    e.preventDefault();
  }

  const onDragEnd = (e: MouseEvent) => {
    isDraging = false;
    distance.x = 0;
    distance.y = 0;
    startAt.x = 0;
    startAt.y = 0;

    e.preventDefault();
  }

  const onDragMove = (e: MouseEvent) => {
    if (!isDraging) {
      return;
    }
    const { pageX, pageY } = e;

    // 获取拖动的距离
    distance.x = pageX - startAt.x;
    distance.y = pageY - startAt.y;

    $element.style.left = `${elementBasePosition.x + distance.x}px`;
    $element.style.top = `${elementBasePosition.y + distance.y}px`;
    
    e.preventDefault();
  }

  return {
    onDragStart,
    onDragEnd,
    onDragMove,
  };
}