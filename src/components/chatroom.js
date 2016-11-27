import React,{Component} from 'react';

class ChatRoom extends Component{
    constructor(props, context){
      super(props,context);
      this.updateMessage=this.updateMessage.bind(this);
      this.submitMessage=this.submitMessage.bind(this);
      this.updateName=this.updateName.bind(this);
      this.state={
        name:"",
        message:"",
        messages:[

        ]
      }

  }
    componentDidMount(){
      console.log("componentDidMount:")

      firebase.database().ref('messages/').on('value',(snapshot)=>{
        const currentMessage1 = snapshot.val();
          console.log("message: "+snapshot.val());
        if(currentMessage1 != null){
          this.setState({
            messages:currentMessage1
          })
          console.log(currentMessage1)


        }

      })

    }
    updateName(event){
      console.log("name"+event.target.value);
      this.setState({
        name:event.target.value
      })
    }
    updateMessage(event){
      console.log("updateMessage "+event.target.value);
      this.setState({
        message:event.target.value
      })
    }
    add(event){
         if(event.keyCode == 13){

         }
     }
     submitMessage(event){
       console.log("submitMessage "+this.state.message);
       const nextMessage={
         id: this.state.messages.length,
         text:this.state.message,
         name:this.state.name
       }

      firebase.database().ref('messages/'+nextMessage.id).set(nextMessage)

    //  var list=Object.assign([], this.state.messages)
    //  list.push(nextMessage)
    //  this.setState({
    //    messages:list
    //  })
    }
  render(){
    const currentMessage=this.state.messages.map((message,i)=>{

      return(

        <div className="textmess">{message.name}:<span key={message.id}>{message.text}</span></div>
      )
    })
    return(
      <div>
      <div className="boxchat">
        <div className="mess">
            {currentMessage}

      </div>
      </div>
      <div className="formchat">
      <form>
        <input onChange={this.updateName} type="text" placeholder="Name" />
        <input onChange={this.updateMessage} onKeyDown={this.add} type="text" placeholder="Messenger"/>
        </form>
        <br/>
        <div className="buton"><button onClick={this.submitMessage}>Submit Message</button></div>

      </div>
      </div>
    );
  }
}
export default ChatRoom
