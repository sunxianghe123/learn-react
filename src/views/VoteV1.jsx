import React, {Component, PureComponent} from "react";
import PropTypes from 'prop-types';

class Vote extends React.Component {
  //属性规则校验
  static defaultProps = {
    num: 0
  }
  static propTypes = {
    title: PropTypes.string.isRequired,
    num: PropTypes.number
  }

  // 初始化状态
  state = {
    supNum: 10,
    oppNum: 5
  }

  render() {
    let { title } = this.props;
    let { supNum, oppNum } = this.state;
    return <div className="vote-box">
    <div className="header">
      <h2 className="title">{title}</h2>
      <span>{supNum + oppNum}</span>
    </div>
    <div className="main">
      <p>支持人数：{supNum}</p>
      <p>反对人数：{oppNum}</p>
    </div>
    <div className="footer">
      <button onClick={()=>{
        this.setState({
          supNum: supNum + 1
        })
      }}>支持</button>
      <button onClick={()=>{
        this.state.oppNum++;
        this.forceUpdate();
      }}>反对</button>
    </div>
  </div>
  }
  
  componentDidMount() {
    console.log('组件已经渲染完毕');
  }

  shouldComponentUpdate(nextProps, nextState) {
    // nextState:存储要修改的最新状态
    // this.state:存储的是修改前的状态
    console.log(this.state, nextState);
    // 此周期函数需要返回true/false
    // 返回true：允许更新，会执行下一个操作
    // 返回false：不允许更新，接下来啥都不处理
    return true;
  }

  UNSAFE_componentWillUpdate(nextProps, nextState) {
    console.log(this.state, nextState);
  }

  componentDidUpdate() {
    console.log('组件更新完毕');
  }
}

export default Vote;