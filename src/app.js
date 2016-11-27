import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import ChatRoom from './components/chatroom'
class App extends Component{
  render(){
    return(
      <div className="chat">
          <ChatRoom />
      </div>
    );
  }
}
ReactDOM.render(<App />,document.getElementById('app'))
