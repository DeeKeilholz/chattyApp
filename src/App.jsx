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

      currentUser: {
        name: "Bob"
      },
      // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
        username: "Bob",
        content: "Has anyone seen my marbles?",
        },
        {
        username: "Anonymous",
        content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    }
// end of this.state
  }


 // componentDidMount is called when the App component is first rendered on the page. The setTimeout waits 3 seconds and then adds a new message from Michelle to the list of messages.

  componentDidMount() {
   console.log("componentDidMount <App />");
   setTimeout(() => {
     console.log("Simulating incoming message");
     // Add a new message to the list of messages in the data store
     const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
     const messages = this.state.messages.concat(newMessage)
     // Update the state of the app component.
     // Calling setState will trigger a call to render() in App and all child components.
     this.setState({messages: messages})
   }, 3000);
 }


// function that should receive the message typed in Chatbar

submitUsername (event) {
  const username = event.target.value;
  this.props.changeUsername(username);
}

submitContent (event) {
  const message = event.target.value;
  this.props.changeContent(message);
}



  render() {
  console.log("Rendering <App/>")


    return (
      <div className="wrapper">

        <nav>
          <h1> {this.state.title} </h1>
        </nav>

        <MessageList messages={this.state.messages}/>
        <Chatbar currentUser={this.state.currentUser.name}  />

    </div>
    )
  }
}
  //pass prop that is message callback
export default App;
