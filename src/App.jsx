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
                name: 'Anonymous'
            },
            messages: [],
            users: 0
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

        // receives messages from the server
        this.webSocket.onmessage = (server) => {

            var serverData = JSON.parse(server.data)
            // console.log("the type is:", serverData.type);
            // console.log(serverData);
            switch (serverData.type) {

                case "incomingMessage":
                    // handle incoming message
                    var messages = this.state.messages
                    //push messages received from server into messages array
                    messages.push(serverData)
                    this.setState({messages: messages})
                    break;

                case "incomingNotification":
                    const notification = this.state.messages
                    messages.push(serverData)
                    this.setState({messages: notification})
                    break;
                    //
                    // console.log("Data from Server w Notification:", serverData)

                case "counter":
                    this.setState({users: serverData.count})
                    break;

                default:
                    //show an error in the conosle
                    throw new Error("Unknown event type", serverData.type)
            }

            // console.log("Message received from server:", messages)

        }

    }

    // sends new username to server
    changeUsername = (username) => {
        const oldUsername = this.state.currentUser.name
        const currentUser = {
            name: username
        }
        this.setState({currentUser})

        if (currentUser === username) {} else {
            const notification = {
                type: "postNotification",
                content: `${oldUsername} has changed their name to ${currentUser.name}`
            }

            // sending new username to server
            const stringUsername = JSON.stringify(notification);
            this.webSocket.send(stringUsername);
        }
    }

    // function that receveives the message typed in Chatbar and adds it to the database
    // on event call the function (get the message)

    submitMessage = (message) => {
        // define messages

        let messages = this.state.messages
        // set up object that receives new message
        // console.log(messages);
        const newMessage = {
            type: 'postMessage',
            username: this.state.currentUser.name,
            content: message
        }

        // sending new message to server
        const stringMessage = JSON.stringify(newMessage);
        this.webSocket.send(stringMessage);

        // console.log("Message sent to server", stringMessage)
    }

    render() {

        return (
            <div className="wrapper">
              <nav>
                <h1>
                  {this.state.title}
                </h1>
                <p>
                  {this.state.users} users online
                    </p>
                </nav>
                <MessageList messages={this.state.messages}/>
                <Chatbar currentUser={this.state.currentUser.name} submitMessage={this.submitMessage} sendNewMessage={this.sendNewMessage} changeUsername={this.changeUsername}/>
            </div>
        )
    }
}

//pass prop that is message callback
export default App;
