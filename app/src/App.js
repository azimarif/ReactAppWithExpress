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

  renderClick = (event) => {
    // event.preventDefault();
let name= document.getElementById('myname').value;
    console.log();
    fetch('/hello', {
      method:'POST',
      headers: { "Content-Type": "application/json"},
      body:JSON.stringify( {name})
    })
      .then(res => res.text())
      .then(passwords => this.setState({ passwords }));
  };

  render() {
    const value = this.state.passwords;
    if(!value) {
      value = ''
    }
    return (
      <div className='App'>Hello {value}
      Name: 
      <input id='myname' type="text" name="myname"></input>
        <button onClick={this.renderClick.bind(this)}  >Click</button>
      </div>
    );
  }
}

export default App;
