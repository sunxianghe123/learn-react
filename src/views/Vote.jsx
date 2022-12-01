
const Vote = function Vote(props) {
  return <div className="vote-box">
    <div className="header">
      <h2 className="title">标题</h2>
      <span>10人</span>
    </div>
    <div className="main">
      <p>支持人数：8人</p>
      <p>反对人数：2人</p>
    </div>
    <div className="footer">
      <button>支持</button>
      <button>反对</button>
    </div>
  </div>
}

export default Vote;