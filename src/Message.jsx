import React, {Component} from 'react';

/* <div class="message">

  <span class="username">Anonymous1</span>
  <span class="content">I won't be impressed with technology until I can download food.</span>
</div>
<div class="message system">
  Anonymous1 changed their name to nomnom.
</div> */

class Message extends Component {

    render() {
        // console.log("Rendering <Message/>")

        return (

            <div className='message'>

                <div className='username'>{this.props.username}</div>
                <div className='content'>{this.props.content}</div>

            </div>

        )
    }
}

export default Message;
