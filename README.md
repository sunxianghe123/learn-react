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
    + JSX虚拟DOM对象[React.createElement(...)]
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


# 关于jsx底层处理机制
1. 把我们编写的JSX语法，编译为虚拟DOM对象[virtualDOM]
   虚拟DOM对象：框架自己内部构建的一套对象体系（对象的相关成员都是React内部规定的），基于这些属性
   描述出，我们所构建视图中的DOM节点的相关特征。
   @1 基于babel-preset-react-app把JSX编译为React.createElement(...)这种格式
      React.createElement(ele, props, ...children)
   @2 再把createElement方法执行，创建出virtualDOM，虚拟DOM对象（又名JSX元素、JSX对象、ReactChild对象）

2. 把构建的virtualDOM渲染为真实DOM
   render方法，对JSX元素进行递归构建：首先获取到JSX对象中的keys，循环对每一个key进行不同的操作。
   + 如果virtualDOM的type类型为字符串，则直接创建真实DOM元素
   + 遇到children属性，循环children属性值，如果值为JSX对象，递归执行render方法

3. 第一次渲染时，是直接将virtualDOM渲染为真实DOM，之后每次视图更新时，都要进行DOM-DIFF对比，计算出补丁包PATCH
   再进行渲染


# 函数组件
创建xxx.jsx文件，在此文件中，创建一个函数，让函数的返回值为JSX元素
组件命名一般采用大驼峰命名法
调用组件的时候，我们可以给调用的组件设置（传递）各种各样的属性
+ 如果设置的属性值不是字符串格式，需要基于“{}胡子语法”进行嵌套
+ 调用组件的时候，我们可以把一些数据/信息基于属性props的方式，传递给组件
+ 基于双闭合调用的方式，我们还可以传递子节点。在传递给函数的props中，有一个children的属性存储这些子节点
```
<DemoOne title="title" x={10} className="box" style={{fontSize:'20px'}}>
  <span>111</span>
  <span>222</span>
</DemoOne>
```
渲染机制：
  @1 基于babel-preset-react-app把调用的组件转换为createElement格式
  @2 执行createElement方法，创建一个virtualDOM对象
  @3 基于root.render把virtualDOM变为真实DOM
    + 此时type值不再是一个字符串了，而是一个函数了
    + 把函数执行 DemoOne()
    + 把virtualDOM中的props，作为实参传递给函数 -> DemoOne(props) props作为父组件给子函数组件传递的参数
    + 接收函数执行的返回结果，交给createElement方法处理，生成virtualDOM对象[也就是当前组件的virtualDOM对象]
    + 最后基于render把组件返回的虚拟DOM变为真实DOM ，插入到#root容器中
