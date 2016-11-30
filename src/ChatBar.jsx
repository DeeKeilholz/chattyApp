import React, {Component} from 'react';

class Chatbar extends Component {
  constructor(props) {
    // passes the props to React.component i.e. the parent class of this component
    super(props);
    // sets up the default state for th app
    this.state = {
      username: this.props.username || '',
      content: ''
    }

  // this.changeContent = this.changeContent.bind(this);

  }

  changeUsername (event) {
    this.setState({
      //event.target is the element receiving our change, i.e. the input
    username: event.target.value,
    })
  }



  //changeContent calls function submitMessage in App.jsx
  changeContent = (event) => {
      if (event.key === 'Enter') {
      this.props.submitMessage(event.target.value)
      // this.props.submitMessage(this.state.content)
    }
  }

handleKeyPress = (event) => {
  if (event.key === 13) {
    this.setState(
      this.state.username,
      this.state.content
    )
  }
}


onChange = (event) => {
  this.setState({content: event.target.value})
  }





  render() {
  // console.log("Rendering <Chatbar/>")
  // console.log(this.props.submitMessage)

  const {currentUser} = this.props

  // console.log(this.props)

    return (

      <footer>

        <input
          id='username'
          type='text'
          placeholder= {currentUser}
          value={currentUser}
          onChange={this.changeUsername}

        />

        <input
          id='new-message'
          type='text'
          placeholder='Type a message and hit ENTER'
          defaultValue={this.state.content}
          // calls the changeMessage function
          onChange={this.onChange}
          onKeyPress={this.changeContent}
        />

      </footer>
    )
  }
}

export default Chatbar;
