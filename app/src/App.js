import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state ={
      passwords:null
    }
    this.renderClick = this.renderClick.bind(this);
  }

  renderClick = () => {
    fetch('/hello')
      .then(res => res.text())
      .then(passwords => this.setState({ passwords }));
  };

  render() {
    const value = this.state.passwords;
    return (
      <div className='App'>Hello {value}
        <button onClick={this.renderClick}  >Click</button>
      </div>
    );
  }
}

export default App;
