/**
 *    All messages view -
 *    Mapping all values from the server to their relevant message property.
 */
import React from 'react';
import Message from './Message';

export default class Messages extends React.Component{

  constructor(props){
      super(props);
  }

  render() {
      const messages = this.props.messages.map((message,i)=>{
        return (
          <Message key={i}
              username={message.username}
              message={message.message}
              status={message.status}
              loggedUser={this.props.loggedUser} />
          );
      });

      return (
            <div className='messagesList' id='messagesList'>
            { messages }
            </div>
      );
  }

  componentDidUpdate(){
      const objDiv = document.getElementById('messagesList');
      objDiv.scrollTop = objDiv.scrollHeight;
  }

}


Messages.defaultProps = {
    messages: []
};
