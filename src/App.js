import React, { Component } from 'react';
import './App.css';
import {connect} from 'react-redux';
import Beers from './components/beers'


class App extends Component {
  render() {
    console.log(this.props);
    return (
      <div className="App">
        <Beers />
      </div>
    );
  }
}

export default connect(state => state.app)(App);
