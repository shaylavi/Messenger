/**
 *    Class for all client/server and "database" communications using sockets (Engine.IO) -
 *    Can be replaced with different technology.
 */
import io from 'engine.io';
import db from './db';  // Represents the "Databse". With a complex structure, should probably be separated to have another middleware handler class.
var server;

function initEngine(port){
  server = io.listen(port);
  server.on('connection',function(socket){
      socket.on('message',(data) => {
        // This scope determines all communication with the client.
        // The client may ask to create / request / update / delete messages.

      // ** The incoming socket message is expected to come in a specific way to be able to work.
      let parsedData = JSON.parse(data);

      switch (Object.keys(parsedData)[0]) {

        case 'all messages':
          processClientRequest(parsedData['all messages'], db.messages, false);
          break;

        case 'new message':
          let newMessage = parsedData["new message"];
          (isMessageClean(newMessage.message)) ?
           newMessage.status = 'sent' : newMessage.status = 'rejected';

          db.messages.push(newMessage);

          processClientRequest(newMessage.username,db.messages, true);
          break;

        case 'delete messages':
          let username = parsedData["delete messages"];
          for (var i=0;i<db.messages.length;i++){
            if(db.messages[i].username == username)
            db.messages[i].status = 'deleted';
          }

          processClientRequest(username, db.messages, true);
          break;

        case 'edit message':
          let oldMessage = parsedData["edit message"]["oldVal"];
          for (var i=0;i<db.messages.length;i++){
              if (db.messages[i].message == oldMessage){
                  // ** Replace old value with the new value
                  db.messages[i].message = parsedData["edit message"]["newVal"];

                  // ** Replace status as needed - sent for successful, rejected for ilegal words
                  (isMessageClean(db.messages[i].message)) ?
                   db.messages[i].status = 'sent' : db.messages[i].status = 'rejected';

                  processClientRequest(parsedData["edit message"]["username"],db.messages);
                  break;
            }
          }
          break;

        }
    });

    function processClientRequest(username, messages, sendToEveryone){
        let newMessagesArray = returnCleanMessages(messages, username);
        socket.send(JSON.stringify({messages:newMessagesArray}));
        if (sendToEveryone)
            server.broadcast(JSON.stringify({refresh:''}),socket.id);
    }
  });
  server.broadcast = function(mssg, id) {
      if (server.clientsCount > 0){
        for( var key in server.clients ) {
      		if(typeof id !== 'undefined') {
      			if( key == id ) {
      				continue;
      			}
      		}
      		server.clients[key].send(mssg);
      	}
      }
  }

  for (var i = 0; i < db.illegalWords.length; i++) {
    db.illegalWords[i] = db.illegalWords[i].toLowerCase();
  }
}

var returnCleanMessages = function(messages,username){
    return messages.filter((value,index,array)=>{
      return (
              value.status != 'rejected' &&
              value.status != 'deleted' ||
              value.username == username);
        });
}

var isMessageClean = function(message){
    let regExpCondition;
    for (var word in db.illegalWords) {
      regExpCondition = new RegExp('(^|\\W)' + db.illegalWords[word] + '($|\\W)');
      if (message.toLowerCase().match(regExpCondition) != null)
        return false;
    }
    return true;
}

module.exports = { initEngine, isMessageClean, returnCleanMessages }
