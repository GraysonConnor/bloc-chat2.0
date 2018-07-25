import React, { Component } from 'react';
import RoomList from './RoomList';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      username: '',
      content: '',
      sentAt: '',
      roomId: ''
    };

    this.messagesRef = this.props.firebase.database().ref('messages');
    this.handleChange = this.handleChange.bind(this);
    this.createMessage = this.createMessage.bind(this);

  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      var message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( message ) });
    });
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      username: 'BlocStudent',
      content: e.target.value,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomId: this.props.setActiveRoom
    });
  }

  createMessage(e) {
    e.preventDefault();
    this.messagesRef.push({
      username: this.state.username,
      content: this.state.content,
      sentAt: this.state.sentAt,
      roomId: this.state.roomId
    });
    this.setState({ username: '', content: '', sentAt: '', roomId: ''});
  }

  render() {
    return(
      <div>
      <ul>
      <h4>Messages:</h4>
        {this.state.messages.map((message) => {
          if (message.roomId === this.props.setActiveRoom) {
            return <li key={ message.key }>{message.content}</li>
          }
          null;
        })
      }
      </ul>
      <form onSubmit={this.createMessage}>
        <label for="submit">Send a message</label>
        <input type="text" value={this.state.content} onChange={this.handleChange} />
        <input type="submit" value="Submit"/>
      </form>
      </div>
    );
  }
}

export default MessageList;
