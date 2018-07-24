import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      name: ''
    };

    this.roomsRef = this.props.firebase.database().ref('rooms');

  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) });
    });
  }


  handleChange(e) {
    this.setState({ name: e.target.value });
  }

  createRoom(e) {
    e.preventDefault();
    this.roomsRef.push({
      name: this.state.name
    });
    this.setState({ name: '' });
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.rooms.map((room) =>
            <li key={ room.key }>{room.name}</li>
          )}
        </ul>
        <form onSubmit={ (e) => this.createRoom(e) }>
          <label for="submit">Add New Room</label>
          <input type="text" value={this.state.name} onChange={ (e) => this.handleChange(e) } />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default RoomList;
