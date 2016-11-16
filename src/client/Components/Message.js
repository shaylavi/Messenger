/**
 *    Message bubble for each user's message pulled from the database -
 *    Each user click his message bubbles to make changes to the data and update the server.
 *    Messages that were deleted or rejected by the server are visible only to their owners.
 */
require('style!css!../styles/style.sass');
import React from 'react';
import CommHandler from './CommHandler';
import ChatApp from './ChatApp'

export default class Message extends React.Component{

  constructor(props){
      super(props);
      this.state = { isEditable:false, changedInput : this.props.message, dirty: false }

      this.editMessage = this.editMessage.bind(this);
      this.submitHandler = this.submitHandler.bind(this);
      this.textChangeHandler = this.textChangeHandler.bind(this);
  }

  render(){
    const hideOnEdit =  (this.state.isEditable) ? 'hidden' : '' ;
    const showOnEdit =  (this.state.isEditable) ? '' : 'hidden' ;
    const defineMessageCls = 'message-window ' +
      this.checkIfOwner() + ' ' +
      this.props.status + ' ';


    return(
      <div className="messageLine"><p></p>

        <div className={ defineMessageCls } onClick={this.editMessage} >
            <div className={'username ' + hideOnEdit}>
            { this.props.username } says:
            </div>
            <div className={'message-body ' + hideOnEdit}>
            {
              (this.props.username == this.props.loggedUser)
              ? (this.state.dirty)
                ? (this.state.changedInput != this.props.message)
                  ? this.state.changedInput
                  : this.props.message
                : this.props.message
              : this.props.message
            }
            </div>

            <div className={ showOnEdit }>
              <form onSubmit={this.submitHandler}>
                <input type="text" className="message-edit"
                  value={this.state.changedInput}
                  onChange={this.textChangeHandler} />
              </form>
            </div>

            <div className={'status ' + hideOnEdit}>
            {
              (this.props.username == this.props.loggedUser)
               ? (this.state.dirty)
                ? (this.state.changedInput != this.props.message)
                 ? 'sending'
                 : 'sending'
                : this.props.status
               : ''
             }
            </div>
        </div>
        <CommHandler ref='CommHandlerFunctions' />
        <p></p></div>
    );
  }

  checkIfOwner(){
    return (this.props.username == this.props.loggedUser) ?
      ((this.props.status != 'deleted' && this.props.status != 'rejected')
        ? 'myMessage'
        : '')
      : 'otherMessages';
  }

  editMessage(){
    if (this.props.username == this.props.loggedUser)
      this.setState({isEditable:true});
  }

  submitHandler(event){
    event.preventDefault();
    this.setState({isEditable:false, dirty: false});
    this.refs.CommHandlerFunctions.editMessage({username:this.props.username,oldVal:this.props.message, newVal:this.state.changedInput});
  }

  textChangeHandler(event){
    this.setState({changedInput:event.target.value, dirty: true});
  }

}
