import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList.js';
import MessageList from './components/MessageList.js';


var config = {
    apiKey: "AIzaSyCca-Ip9qV43vNU4Oe8124xHr8ATdbsLgo",
    authDomain: "blocchat-96f7e.firebaseapp.com",
    databaseURL: "https://blocchat-96f7e.firebaseio.com",
    projectId: "blocchat-96f7e",
    storageBucket: "blocchat-96f7e.appspot.com",
    messagingSenderId: "55940531605"
  };
  firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRoom: ''
    };

    this.setActiveRoom = this.setActiveRoom.bind(this);
  }

  setActiveRoom(room) {
    this.setState({ activeRoom: room });
  }

  render() {
    return (
    <div className="App">
      <h1>Bloc Chat</h1>
      <h2>{this.state.activeRoom.name || "Select Room"}</h2>
      <RoomList firebase={firebase} setActiveRoom={this.setActiveRoom} />
      { this.state.activeRoom ?
      (<MessageList firebase={firebase} setActiveRoom={this.state.activeRoom.key} />) : (null)
      }
    </div>
    );
  }
}

export default App;
