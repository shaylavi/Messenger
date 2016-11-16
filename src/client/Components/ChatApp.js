/**
 *    Chat window and user controllers -
 *    Messages view, new message box and delete the user's messages options
 */
import React from 'react';
import CommHandler from './CommHandler';
import Messages from './Messages';
import ChatInput from './ChatInput';

export default class ChatApp extends React.Component{

    constructor(props){
        super(props);
        this.state = { messages:[]};

        this.sendHandler = this.sendHandler.bind(this);
        this.deleteMessagesHandler = this.deleteMessagesHandler.bind(this);
    }

    componentDidMount(){
        this.refs.CommHandlerFunctions.initEngine(this.props.username);
    }

    render(){
        return (
            <div className="messagesContainer">
              <center>
                <h1><p>Main chat window</p></h1>
                <Messages messages={this.state.messages} loggedUser={this.props.username}/>
                <CommHandler serverResponse={this.updateMessages.bind(this)} loggedUser={this.props.username} ref='CommHandlerFunctions' />
                <p></p>
                <div className="buttons">
                  <div className="userInput">
                    <ChatInput onSend={this.sendHandler} />
                  </div>
                  <div className="earaseButton">
                    <button onClick={this.deleteMessagesHandler} >Delete my messages!</button>
                  </div>
                </div>
              </center>
            </div>
        );}

    deleteMessagesHandler(){
        this.refs.CommHandlerFunctions.deleteMessages(this.props.username);
    }
    sendHandler(message){
        const messageObject = {
            username: this.props.username,
             message,
             status: 'sending'
        };

        this.createMessage(messageObject);
    }
    createMessage(message){
        // ** Shows the new message locally before going to the server **
        let messages = this.state.messages;
        messages.push(message);
        this.setState(messages);

        this.refs.CommHandlerFunctions.newMessage(message);
    }

    updateMessages(messages){
        this.setState({messages});
    }

}
