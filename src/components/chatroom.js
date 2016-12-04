import React,{Component} from 'react';
import Time from 'react-time';
import moment from 'moment';

class ChatRoom extends Component{
    constructor(props, context){
      super(props,context);
      this.updateMessage=this.updateMessage.bind(this);
      this.submitMessage=this.submitMessage.bind(this);
      this.updateName=this.updateName.bind(this);
      this.add=this.add.bind(this);
      this.state={
        time:"",
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
        message:event.target.value,
        time: moment().format('lll')
      })

    }
    add(event){
       if(event.keyCode == 13)
         {
           console.log("enter");
           event.preventDefault();
           var notes=this.refs.notes;


           const nextMessage={

           id: this.state.messages.length,
           times:this.state.time,
           text:this.state.message,
           name:this.state.name
         }


        firebase.database().ref('messages/'+nextMessage.id).set(nextMessage)
        notes.value ="";
        this.props.onSubmit(details);
    }
  }


     submitMessage(event){
       console.log("submitMessage "+this.state.message);
       event.preventDefault();

       var notes=this.refs.notes;
       const nextMessage={

         id: this.state.messages.length,
         times:this.state.time,
         text:this.state.message,
         name:this.state.name
       }


      firebase.database().ref('messages/'+nextMessage.id).set(nextMessage);
      notes.value ="";
      this.props.onSubmit(details);



    }
  render(){
      var now = new Date();
    const currentMessage=this.state.messages.map((message,i)=>{

      return(

        <div className="textmess">
        {message.times}:{message.name}:<span key={message.id}>{message.text}</span>
        </div>
      )
    })
    return(
      <div className="row">
      <div className="boxchat col-md-6">
        <div className="mess">
            {currentMessage}
      </div>
      </div>
      <div className="formchat">

        <input onChange={this.updateName} type="text" placeholder="Name" />

        <input ref="notes" onChange={this.updateMessage} onKeyDown={this.add} type="text" placeholder="Messenger"/>
        <div className="buton">
        <button onClick={this.submitMessage}>Submit Message</button>
        </div>
        <br/>

      </div>
      </div>
    );
  }
}
export default ChatRoom
