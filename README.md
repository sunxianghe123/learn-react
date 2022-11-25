### 一个react项目中，默认会安装：
react：React框架的核心
react-dom：React视图渲染的核心（基于React构建WebApp(HTML页面)）
----> react-native：构建和渲染App的
react-scripts：脚手架为了让项目目录干净一些，把webpack打包的规则及相关的插件/LOADER等都隐藏到了node_modules目录下，react-scripts就是脚手架中自己对打包命令的一种封装，基于它打包，会调用mode_modules中的webpack等进行处理。

test命令：单元测试
eject命令：暴露webpack配置规则，自己修改默认打包规则
web-vitals：性能检测工具

browserslist：设置浏览器兼容情况

%PUBLIC_URL%：后期webpack打包的时候，会对这个语法进行编译，代表public这个根目录

react处理跨域：在src目录下新建setupProxy.js写处理跨域的逻辑
通过npm install http-proxy-middleware 这个中间件进行跨域代理
webpack-dev-serve的跨域代理也是基于http-proxy-middleware完成的

React.Fragment：<></>  空文档标记标签，既保证了可以只有一个根节点，又不会新增一个HTML层级结构

{}：胡子语法，内部存放 JS表达式（执行后有返回值的）
  + number/string:值是什么，渲染的就是啥
  + boolean/null/undefined/Symbol/BigInt:渲染的内容是空
  + 除数组对象外，其余对象一般都不支持在{}中进行渲染，但也有特殊情况
    + JSX虚拟DOM对象
    + 给元素设置style行内样式，要求必须写成一个对象格式
  + 数组：把数组中的每一项分别拿出来渲染
  + 函数：不支持在{}中渲染，但是可以作为函数组件，用<Component/>方式渲染

@6. 给元素设置样式
  + 行内样式：基于对象的格式处理，直接写样式字符串会报错
    ```
    <h2 style={{ color: 'red', fontSize: '18px' }}>
    ```
  + 设置样式类名：需要把class替换为className
    ```
    <h2 className='box'>
    ```

jsx中循环渲染列表，用Array.map方法    循环都需要家key值，用于dom-diff