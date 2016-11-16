/**
 *    Text message controller for the user
 *
 */
import React from 'react';
import ReactDOM from 'react-dom'

export default class ChatInput extends React.Component{

  constructor(props){
      super(props);
      this.state = {chatInput: ''};

      this.submitHandler = this.submitHandler.bind(this);
      this.textChangeHandler = this.textChangeHandler.bind(this);
  }

  componentDidMount(){
      ReactDOM.findDOMNode(this.refs.userTxtbox).focus();
  }

  render() {
    return (
      <form className="chat-input" onSubmit={this.submitHandler}>
      <input type="text" className="textInput"
        onChange={this.textChangeHandler}
        value={this.state.chatInput}
        placeholder="Type your message and press enter..."
        ref="userTxtbox"
        required />
      </form>
    );
  }

  textChangeHandler(event){
      this.setState({chatInput:event.target.value});
  }

  submitHandler(event){
      event.preventDefault();
      this.props.onSend(this.state.chatInput);
      this.setState({chatInput:''});
  }

}
