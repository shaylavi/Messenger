/**
 *    Main screen -
 *    asking for a nickname and passing it, then switching the view to a chat room.
 */
import React from 'react';
import ReactDOM from 'react-dom'
import ChatApp from './ChatApp';

export default class App extends React.Component{

    constructor(props){
        super(props);
        this.state = {username: ''};

        this.usernameSubmitHandler = this.usernameSubmitHandler.bind(this);
        this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
    }

    componentDidMount(){
      ReactDOM.findDOMNode(this.refs.nickname).focus();
    }

    render() {
        if (this.state.submitted) {
          return (
              <ChatApp username={this.state.username} />
          )}

        return (
            <center>
              <div className="loginScreen">
                <form onSubmit={this.usernameSubmitHandler} className="clsUserName">
                    <h1>Chat app challenge</h1>
                    <h3><p>Please identify yourself with a nickname: </p></h3>
                    <div>
                      <input type="text" ref="nickname" onChange={this.usernameChangeHandler} placeholder="Enter a nickname: " required />
                      <input type="submit" value="submit" />
                    </div>
                </form>
              </div>
            </center>
        );
    }

    usernameChangeHandler(event){
        this.setState({username:event.target.value});
    }
    usernameSubmitHandler(event){
        event.preventDefault();
        this.setState({ submitted:true, username:this.state.username });
    }

}

App.defaultProps = {};
