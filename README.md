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


属性props的处理
+ 调用组件，传递进来的属性是“只读”的
  获取：props.xxx
+ 作用：父组件调用子组件的时候，可以基于属性，把信息传递给子组件，让组件的复用性更强
+ 虽然不能修改props，但是可以做一些规则校验
  + 设置默认值：把函数组件看作类，设置静态私有属性方法
  + 设置其他规则，例如：数据值格式、是否必传……（依赖一个官方插件prop-types）

react中插槽的处理
+ 父组件调用时，直接在子组件双闭合标签中填入dom元素，react会把每一个dom元素变为virtualDOM传进props
+ 子组件通过props.children获取传递的子节点信息
+ 可以基于React.Children对象中提供的方法，对props.children做处理：count/forEach/map/toArray...
  好处： 在这些方法的内部，已经对children的各种形式做了处理
  let {children} = props;
  React.Children.forEach(children, ()=>{});


# 静态组件和动态组件
函数组件是“静态组件”：
  + 组件第一次渲染完毕后，无法基于“内部的某些操作”让组件更新[无法实现“自更新”]；但是如果调用它的父组件更新了，那么相关的子组件也一定会更新[可能传递最新的属性值进来]
  + 函数组件具备：属性 [其他的状态等内容几乎都没有]
  + 优势：比类组件处理的机制简单，这样导致函数组件的渲染速度更快
类组件是“动态组件”：
  + 组件在第一次渲染完毕后，除了父组件更新可以触发其更新，我们可以通过：this.setState 修改状态 或者 this.forceUpdate 等方式，让组件实现“自更新”
  + 类组件具备：属性、状态、周期函数、ref...[几乎组件应该有的东西它都具备]
  + 优势：功能强大
===> Hooks组件[推荐]：具备了函数组件和类组件的各自优势，在函数组件的基础上，基于hooks函数，让函数组件也可以拥有状态、周期函数等，让函数组件也可也实现自更新[动态化]
1. 函数组件是“静态组件”
  第一次渲染组件的时候，把函数执行
    + 产生一个私有的上下文
    + 把解析出来的props[含children]传递进来[但是被冻结了]
    + 对返回的JSX元素[virtualDOM]进行渲染
  当我们点击按钮的时候，会把绑定的小函数执行：
    + 修改上级上下文中的的变量
    + 私有变量值发生了改变，
    + 但是视图不会更新
  =>函数组件第一次渲染完毕后，组件中的内容，不会根据组件内的某些操作再进行更新，所以称它为静态组件
  =>除非再父组件中，重新调用这个函数组件[可以传递不同的属性信息]

1. 第一次渲染完毕后，基于组件内部的某些操作，让组件可以更新 ==> 动态组件
  方法：类组件、Hooks组件（在函数组件中使用Hooks函数）
  创建类组件：
    + 创建一个构造函数（类），要求必须继承React.Component/PureComponent这个类
    + 使用extends继承，必须给当前类设置一个render方法[放在其原型上]：在render方法中，返回需要渲染的视图

React基于extends实现继承：
  1. 首先基于call继承 React.Component.call(this) 让this指向当前类组件的实例
    function Component(props, context, updater) {...} Component方法接收三个参数
    给创建的实例设置四个私有属性：props/context/refs/updater
  2. 再基于原型继承 xxx.prototype.__proto__ = React.Component.prototype
    实例具备了除当前类的方法之外，还具备了React.Component.prototype原型上提供的方法：
    isReactComponent、setState、forceUpdate
  3. 只要类组件中设置了constructor，则constructor内部第一句话一定要执行super()
    执行super()等价于React.Component.call(this)
    在super()中传值，相当于给React.Component.call(this,xxx,xxx,xxx,...)传参
    super(10, {}, {})
  4. 如果在类组件中不写constructor，相当于默认执行constructor(){ super() }


render函数在渲染的时候，如果type是：
  + 字符串：创建一个标签
  + 普通函数：把函数执行，并且把props传递给函数
  + 构造函数：把构造函数基于new执行[也就是创建类的一个实例]，也会把解析出来的props传递过去
    + 每调用一次组件都会创建一个单独的实例
    + 把在类组件中编写的render函数执行，把返回的jsx[virturalDOM]当作组件视图进行渲染
    + 例如：new Vote({title: 'xxxx'});

# 从调用类组件[new Vote({...})]开始，类组件内部发生的事情：
  1. 初始化属性 && 规则校验
      方案一：
      constructor(props) {
        super(props); // 会把传递进来的属性挂载到this实例上
        console.log(this.props); // 获取到传递的属性
      }
      方案二：
      即使我们自己不在constructor中处理[或者constructor都没写]，在constructor处理完毕后，
      React内部也会把传递的props挂载到实例上；所以在其他的函数中，只要保证this是实例，就可以基于
      this.props获取传递的属性
      + 同样this.props获取的属性对象也是被冻结的{只读的} Object.isFrozen(this.props) -> true
  2. 初始化状态
    状态：后期修改状态，可以触发视图的更新
    需要手动初始化，如果我们没有做相关的处理，则默认会往实例上挂载一个state，初始值是null => this.state=null
    手动处理： 
    state = {
      ...
    }
    修改状态，控制视图更新：
    想让视图更新，我们需要基于React.Component.prototype提供的方法操作：
    @1 this.setState(partialState, callback) 既可以修改状态，也可以更新视图
      partialState:部分状态
    @2 this.forceUpdate() 强制更新
  3. 触发 componentWillMount 周期函数（钩子函数）
    钩子函数：在程序运行到某个阶段，我们可以提供一个处理函数，让开发者在这个阶段做一些自定义的事情
    此周期函数，目前是不安全的（未来可能要被移除），不建议使用
    + 使用此方法，控制台会报黄色警告。为了不报黄色警告，可以加个前缀 UNSAFE_componentWillMount
  4. 触发render周期函数：渲染render返回的视图
  5. 触发componentDidMount 周期函数：第一次渲染完毕
    + 页面中已经创建了真实DOM元素[此时可以获取真实DOM了]

组件内部更新的逻辑[当修改了相关状态，组件会更新]
  1. 触发 shouldComponentUpdate 周期函数：是否允许更新
    shouldComponentUpdate(nextProps, nextState) {
      // nextProps/nextState:将要修改的属性状态
      // this.state:存储的是修改前的状态
      console.log(this.state, nextState);
      // 此周期函数需要返回true/false
      // 返回true：允许更新，会执行下一个操作
      // 返回false：不允许更新，接下来啥都不处理
      return true;
    }
  2. 触发componentWillUpdate 与 componentWillMount一样，也是不安全的
    + 在这个阶段，状态还没被修改
  3. 修改状态值[让this.state.xxx改为最新的值]
  4. 触发render周期函数：组件更新
    + 按照最新的状态/属性，把返回的JSX编译为virtualDOM
    + 和上一次渲染出来的virtualDOM进行对比[DOM-DIFF]
    + 把差异的部分进行渲染[渲染为真实的DOM]
  5. 触发componentDidUpdate周期函数：组件更新完毕
  特殊说明：如果我们是基于 this.forceUpdate() 强制更新视图，会跳过 shouldComponentUpdate 周期函数校验，
  直接从 componentWillUpdate 开始更新[也就是：视图一定会更新] 就算没有状态更新，也会重新编译virtualDOM,
  再进行DOM-DIFF，会浪费性能

父组件更新，触发子组件更新：
  1. 触发 componentWillReceiveProps 周期函数：在接收最新属性之前
    + 此周期函数是不安全的
    UNSAFE_componentWillReceiveProps(nextProps) {
      console.log(this.props, nextProps);
    }
  2. shouldComponentUpdate...
  深度优先原则：父组件在操作中，遇到子组件，一定是把子组件处理完，父组件才继续处理
  + 父组件第一次渲染：父willMount -> 父render [子willMount -> 子render -> 子didMount] -> 父didMount
  + 父组件更新：父shouldUpdate -> 父render [子WillReceiveProps -> 子shouldUpdate -> 子willUpdate -> 子render ->子didUpdate] -> 父didUpdate
  + 父组件销毁：父willUnmount -> 处理[子willUnmount -> 子销毁] -> 父销毁

组件卸载的逻辑：
  1. 触发 componentWillUnmount 周期函数：组件销毁之前
  2. 销毁

PureComponent和Component的区别:
PureComponent会给类组件默认加一个shouldComponentUpdate周期函数
  + 在此周期函数中，它对新老的属性/状态 会坐一个浅比较
  + 如果经过浅比较，发现属性和状态并没有改变，则返回false[也就是不继续更新组件]，有变化才会去更新
    ```
    // 检测是否为对象
    const isObject = function isObject(obj) {
      return obj !== null && /^(object|function)$/.test(typeof obj);
    }
    // 对象浅比较方法
    const shallowEqual = function shallowEqual(objA, objB) {
      if(!isObject(objA) || !isObject(objB)) return false;
      if(objA === objB) return true;
      // 先比较成员的数量
      let keysA = Reflect.ownKeys(objA),
          keysB = Reflect.ownKeys(objB);
      if(keysA.length !== keysB.length) return false;
      // 数量一致，再逐一比较内部的成员[只比较第一级：浅比较]
      for(let i = 0; i < keysA.lenght; i++) {
        let key = keysA[i];
        // 如果一个对象中有这个成员，一个对象中没有；或者，都有这个成员，但是成员值不一样；都应该呗判定为不相同
        if(!objB.hasOwnProperty(key) || !Object.is(objA[key], objB[key])) {
          return false;
        }
      }
      // 以上都处理完，发现没有不相同的成员，则认为两个对象是相等的
      return true;
    }
    ```