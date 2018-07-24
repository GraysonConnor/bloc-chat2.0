import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList.js';


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
  render() {
    return (
      <div className="App">
        <RoomList firebase={firebase}/>
      </div>
    );
  }
}

export default App;
