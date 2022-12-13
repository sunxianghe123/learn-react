import React from "react";
import {flushSync} from 'react-dom';

class Demo extends React.Component {

  /* 基于React内部的处理，如果我们给合成事件绑定一个普通函数，当事件行为触发，绑定的函数执行，方法中的this会是undefined[不好] 解决方案：this->实例
    + 使用bind方法，预处理this
    + 也可以把绑定的函数设置为箭头函数，让其使用上下文中的this[也就是我们的实例]

  合成事件对象SyntheticBaseEvent：我们在React合成事件触发的时候，也可以获取到事件对象，只不过此对象是合成事件对象[React内部经过特殊处理，把各个浏览器的事件对象统一化后，构建的一个事件对象]
    合成事件对象中，也包含了浏览器内置事件对象中的一些属性和方法[常用的基本都有]
    nativeEvent：基于这个属性，可以获取浏览器内置[原生]的事件对象
    基于bind的合成事件中，最后一个参数是SyntheticBaseEvent
  */
  handle(ev) {
    console.log(this);
    console.log(ev);  // SyntheticBaseEvent 合成事件对象 [React内部经过特殊处理，把各个浏览器的事件对象统一化后，构建的一个事件对象]
  }

  handle2 = (ev)=> {
    console.log(ev);
  }

  render() {
    return <div>
      <button onClick={this.handle.bind(this)}>按钮</button>
      <button onClick={this.handle2}>按钮2</button>
    </div>
  }
}

export default Demo;