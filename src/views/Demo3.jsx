import React from "react";

class Demo extends React.Component {
  box3 = React.createRef();
  render() {
    return <div>
      <h2 className="title" ref="titleBox">温馨提示</h2>
      <h2 className="title" ref={x=>this.box2 = x}>温馨提示2</h2>
      <h2 className="title" ref={this.box3}>温馨提示3</h2>
    </div>
  }
  componentDidMount() {
    // 第一次渲染完毕[virtualDOM已经变为真实DOM]：此时我们可以获取需要操作的DOM元素
    console.log(this.refs.titleBox);
    console.log(this.box2);
    console.log(this.box3.current);
  }
}

export default Demo;