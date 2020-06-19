import React from 'react';
import { IPoint } from '.';

const Line: React.FunctionComponent<{
  startPoint: IPoint;
  endPoint: IPoint;
  id?: string;
  className?: string;
  style?: any;
}> = (props) => {
  const { startPoint, endPoint, style = {} } = props;
  
  const { stroke, strokeWidth = 1 } = style;
  let { x: startX, y: startY } = startPoint;
  let { x: endX, y: endY } = endPoint;

  if (stroke !== 'none') {
    
  }

  return (
    <line
      x1={startPoint.x}
      y1={startPoint.y}
      x2={endPoint.x}
      y2={endPoint.y}
      style={style}
    />
  );
}

export default Line;
