/**
 *    Empty Component Class for all client/server communication using sockets (Engine.IO) -
 *    Can be replaced with different technology.
 *    Expects to have a property named serverResponse for 'outside'.
 */
import React from 'react';
var socket = require('engine.io-client')('ws://localhost:8887');

export default class CommHandler extends React.Component{

  constructor(props){
      super(props);
  }
  render(){ return <div></div> }

  initEngine(username){
      socket.on('message', (data)=>{
        // This scope determines all communication with the server.
        // Either he gave me new messages or told me to ask for an update.

        let parsedData = JSON.parse(data);
        switch (Object.keys(parsedData)[0]) {

          case 'messages':
            let messages = JSON.parse(data)["messages"];
            this.props.serverResponse(messages);
            break;

          case 'refresh':
            this.allMessages(username);
            break;

        }
      });
      this.allMessages(username);
  }

  newMessage(messageObj){
      this._requestFromServer('new message', JSON.stringify(messageObj));
  }
  editMessage(messageObj){
      this._requestFromServer('edit message', JSON.stringify(messageObj));
  }
  deleteMessages(username){
      this._requestFromServer('delete messages', '"' + username + '"');
  }
  allMessages(username){
      this._requestFromServer('all messages', '"' + username + '"');
  }


  _requestFromServer(eventName, data = null){
      socket.send('{"' + eventName + '": ' + data + '}');
  }

}
