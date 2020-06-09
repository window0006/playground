import React, { useRef } from 'react';
import styles from './clock.less';

const Component: React.FunctionComponent = () => {
  const canvasRef = useRef();
  
  return (
    <>
      <canvas id="canvas" ref={canvasRef} />
    </>
  );
}

export default Component;
