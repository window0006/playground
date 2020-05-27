import { hot } from 'react-hot-loader/root';
// react-hot-loader/root需要在react之前被引入
import React, { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);
  
  const handleClick = () => {
    debugger
    setCount(count + 1)
  };

  return (
    <div onClick={handleClick}>count: {count}</div>
  );
}

export default hot(App);
