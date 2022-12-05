import Dialog from '../components/Dialog';
import Vote from './VoteV1';

const DemoOne = function DemoOne(props) {
  return <>
    <Dialog title={'友情提示'} style={{background: 'red', width: 100, height: 100, color: 'green'}} content={'大家出门做好个人防护'}></Dialog>
    <Dialog content={'大家出门做好个人防护'}>
      <button>确定</button>
      <button>很确定</button>
    </Dialog>
    <Vote title="React其实还是很好学的"></Vote>
  </>
}

export default DemoOne;