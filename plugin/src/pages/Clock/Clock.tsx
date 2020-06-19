import React, { useRef } from 'react';
import './clock.less';
import Circle from 'src/components/Shape/Circle';
import Rect from 'src/components/Shape/Rect';
import Line from 'src/components/Shape/Line';

const Component: React.FunctionComponent = () => {
  const startPoint = {
    x: 0, y: 0
  }
  return (
    <svg className="wrapper" width="100%" height="100%">
      <title>svg 流程图</title>
      <desc>svg 流程图，可拖拽，可缩放</desc>

      <Circle
        startPoint={startPoint}
        radius={50}
        style={{
          stroke: 'red',
          fill: 'none'
        }}
      />

      <Rect
        width={100}
        height={100}
        startPoint={{
          y: 110
        }}
        style={{
          stroke: 'red',
          fill: 'none'
        }}
      />

      <Line
        startPoint={{
          x: 0,
          y: 220,
        }}
        endPoint={{
          x: 100,
          y: 220
        }}
        style={{
          stroke: 'red'
        }}
      />
    </svg>
  );
}

export default Component;
