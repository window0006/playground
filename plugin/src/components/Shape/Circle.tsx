import React from 'react';
import { IPoint } from './';

const Circle: React.FunctionComponent<{
  originPoint?: IPoint;
  startPoint?: IPoint;
  radius: number;
  id?: string;
  className?: string;
  style?: any;
}> = (props) => {
  const { id = '', className = '', startPoint, originPoint, radius, style = {} } = props;
  let { x = 0, y = 0 } = originPoint || {};
  
  if (startPoint?.x !== undefined) {
    x = startPoint.x + radius;
  }
  if (startPoint?.y !== undefined) {
    y = startPoint.y + radius;
  }

  const { stroke, strokeWidth = 1 } = style;
  if (stroke !== 'none') {
    x += strokeWidth / 2;
    y += strokeWidth / 2;
  }

  return (
    <circle
      id={id}
      className={className}
      cx={`${x}`}
      cy={`${y}`}
      r={`${radius}`}
      style={style}
    />
  );
}

export default Circle;