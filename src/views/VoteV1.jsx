import React, {Component, PureComponent} from "react";

class Vote extends React.Component {
  render() {
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
      <button>支持</button>
      <button>反对</button>
    </div>
  </div>
  }
}

export default Vote;