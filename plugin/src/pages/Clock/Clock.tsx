import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';

import './clock.less';
import { Dragable } from 'src/components/Shape';
import Circle from 'src/components/Shape/Circle';
import Rect from 'src/components/Shape/Rect';
import Line from 'src/components/Shape/Line';

const startPoint = {
  x: 0, y: 0
}
const renderSvg = () => (
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

class TodoList extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {items: ['hello', 'world', 'click', 'me']};
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleAdd() {
    const newItems = this.state.items.concat([
      prompt('Enter some text')
    ]);
    this.setState({items: newItems});
  }

  handleRemove(i) {
    let newItems = this.state.items.slice();
    newItems.splice(i, 1);
    this.setState({items: newItems});
  }

  render() {
    const items = this.state.items.map((item, i) => (
      <div key={item} onClick={() => this.handleRemove(i)}>
        {item}
      </div>
    ));

    return (
      <div>
        <button onClick={this.handleAdd}>Add Item</button>
        <CSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          {items}
        </CSSTransitionGroup>
      </div>
    );
  }
}

const Component: React.FunctionComponent = () => {
  
  return (
    <>
      <Dragable>
        <CSSTransitionGroup
          transitionName="example"
          transitionAppear={true}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
        >
          <div
            style={{
              width: 300,
              height: 300,
              background: '#61dafb',
            }}
          />
        </CSSTransitionGroup>
      </Dragable>
      {
        <TodoList></TodoList>
      }
    </>
  );
}

export default Component;
