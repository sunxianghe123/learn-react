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