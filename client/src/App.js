import React, { Component } from 'react';
import NavBarComponent from "./component/NavBarComponent";
import SignUpComponent from "./component/SignUpComponent";

class App extends Component {
  render() {
    return (
      <div className="App">
          <div className="container">
              <NavBarComponent />
              <SignUpComponent />
          </div>
      </div>
    );
  }
}

export default App;
