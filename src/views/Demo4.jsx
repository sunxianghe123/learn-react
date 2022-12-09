import React from "react";

const Child2 = React.forwardRef(function Child2(props, ref) {
  console.log(ref);
  return <div>
    子组件
    <button ref={ref}>按钮</button>
  </div>
})

class Demo extends React.Component {
  render() {
    return <div>
      <Child2 ref={x => this.child2 = x}></Child2>
    </div>
  }
  componentDidMount() {
    // 第一次渲染完毕[virtualDOM已经变为真实DOM]：此时我们可以获取需要操作的DOM元素
    console.log(this.child2);
  }
}

export default Demo;