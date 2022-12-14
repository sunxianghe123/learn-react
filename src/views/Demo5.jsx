import React from "react";
import {flushSync} from 'react-dom';

class Demo extends React.Component {
  state = {
    x: 10,
    y: 5,
    z: 0
  }
  handle = ()=>{
    // this->实例 this是宿主环境的this
    let {x, y, z} = this.state;
    this.setState({
      x: x + 1
    });
    console.log(this.state);
    flushSync(()=>{
      this.setState({ y: y + 1 })
    });
    console.log(this.state); 
    this.setState({z: this.state.x + this.state.y});
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