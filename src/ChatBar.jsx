import React, {Component} from 'react';

class Chatbar extends Component {
  constructor(props) {
    // passes the props to React.component i.e. the parent class of this component
    super(props);
    // sets up the default state for th app
    this.state = {
      username: '',
      content: ''
    }

  }


  changeUsername (event) {
    this.setState({
      //event.target is the element receiving our change, i.e. the input
    username: event.target.value,
    })
  }

  changeContent(event) {
    this.setState({
      //event.target is the element receiving our change, i.e. the input
    content: event.target.value,
    })
  }


  //when I enter info the callback in App is called

  render() {
  // console.log("Rendering <Chatbar/>")

  var {currentUser} = this.props

  // console.log(this.props)

    return (

      <footer>

        <input
          id='username'
          type='text'
          placeholder={currentUser}
          value={this.state.username}
          // calls the changeMessage function
          onKeyPress={this.submitUsername} />

        <input
          id='new-message'
          type='text'
          placeholder='Type a message and hit ENTER'
          value={this.state.content}
          // calls the changeMessage function
          onKeyPress={this.submitContent} />

      </footer>
    )
  }
}

export default Chatbar;
