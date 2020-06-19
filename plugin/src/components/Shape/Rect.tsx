import React from 'react';
import { IPoint } from './';

const Rect: React.FunctionComponent<{
  startPoint: IPoint;
  width: number;
  height: number;
  id?: string;
  className?: string;
  style?: any;
}> = (props) => {
  const { id = '', className = '', startPoint, width, height, style = {} } = props;
  const { stroke, strokeWidth = 1 } = style;

  let { x = 0, y = 0 } = startPoint;

  if (stroke !== 'none') {
    y += strokeWidth / 2;
    x += strokeWidth / 2;
  }

  return (
    <rect
      id={id}
      className={className}
      x={`${x}`}
      y={`${y}`}
      height={`${height}`}
      width={`${width}`}
      style={style}
    />
  );
}

export default Rect;
