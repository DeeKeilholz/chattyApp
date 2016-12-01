import React, {Component} from 'react';
import Chatbar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {

  constructor(props) {
    // passes the props to React.component i.e. the parent class of this component
    super(props)
    // sets up the default state for th app
    this.state = {
      title: 'Chatty',
      currentUser: {name: "Bob"},
      messages: []
      // messages coming from the server will be stored here as they arrive
    }
  }

  // componentDidMount is called when the App component is first rendered on the page.

  componentDidMount() {
    console.log("componentDidMount <App />");

    this.webSocket = new WebSocket("ws://localhost:4000");

    this.webSocket.onopen = (event) => {
      console.log('So friggin connected to the server')
    }

  }

  // this.webSocket.onmessage = (fromWS) => {
  //     const messages = this.state.messages.concat(JSON.parse(fromWS.data))
  //     console.log(messages)
  // }

  // function that receveives the message typed in Chatbar and adds it to the database
  // on event call the function (get the message)

  submitMessage = (message) => {
    // define messages
    // console.log(this.state)
    let messages = this.state.messages
    // set up object that receives new message
    console.log(messages);
    const newMessage = {
      username: "Bob",
      content: message
    }
    //push new messages into messages array
    messages.push(newMessage)
    // have the new state reflect the message
    this.setState({messages: messages})


    const stringMessage = JSON.stringify(newMessage);
    this.webSocket.send(stringMessage);
  }


  render() {
    console.log("Rendering <App/>")


    return (
      <div className="wrapper">
        <nav>
          <h1> {this.state.title} </h1>
        </nav>
        <MessageList messages={this.state.messages}/>
        <Chatbar currentUser={this.state.currentUser.name} submitMessage={this.submitMessage} sendNewMessage={this.sendNewMessage} />
      </div>
    )
  }
}

//pass prop that is message callback
export default App;
