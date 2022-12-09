import React from "react";
import {flushSync} from 'react-dom';

class Demo extends React.Component {
  state = {
    x: 10,
    y: 5,
    z: 0
  }
  handle = ()=>{
    for(let i = 0; i < 20; i++) {
      this.setState(prevState=>{
        return {
          x: prevState.x + 1
        }
      })
    }
  }
  render() {
    console.log('视图渲染render');
    let {x, y, z} = this.state;
    return <div>
      {x}-{y}-{z}
      <button onClick={this.handle}>按钮</button>
    </div>
  }
}

export default Demo;