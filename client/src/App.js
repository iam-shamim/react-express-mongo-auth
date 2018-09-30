import React, { Component } from 'react';
import NavBarComponent from "./component/NavBarComponent";
import SignUpComponent from "./component/SignUpComponent";
import { Route, Switch } from 'react-router-dom'
import HomeComponent from "./component/HomeComponent";
import FlashMessageList from "./component/flash/FlashMessageList";

class App extends Component {
  render() {
    return (
      <div className="App">
          <div className="container">
              <NavBarComponent />
              <FlashMessageList/>
              <Switch>
                  <Route path="/signup" exact  component={SignUpComponent} />
                  <Route path="/" exact component={HomeComponent} />
              </Switch>
          </div>
      </div>
    );
  }
}

export default App;
