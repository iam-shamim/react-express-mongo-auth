import React, { Component } from 'react';
import NavBarComponent from "./component/NavBarComponent";
import SignUpComponent from "./component/SignUpComponent";
import {Link, Route, Switch} from 'react-router-dom'
import HomeComponent from "./component/HomeComponent";
import FlashMessageList from "./component/flash/FlashMessageList";
import LoginComponent from "./component/LoginComponent";
import NewEventPage from "./component/events/NewEventPage";
import requireAuth from "./utils/requireAuth";
import LogoutComponent from "./component/LogoutComponent";
import notAuth from "./utils/notAuth";
import InstituteHeader from "./component/flash/InstituteHeader";
import InstituteComponent from "./component/InstituteComponent";

class App extends Component {
  render() {
    return (
      <div className="App">
          <div className="container">
              <NavBarComponent />
          </div>
          <div className="wrapper">
              <section className="main no-padding">
                  <InstituteHeader/>
                  <div className="container">
                      <FlashMessageList/>
                      <Switch>
                          <Route path="/signup" exact  component={notAuth(SignUpComponent)} />
                          <Route path="/login" exact  component={notAuth(LoginComponent)} />
                          <Route path="/logout" exact component={requireAuth(LogoutComponent)} />
                          <Route component={requireAuth(HomeComponent)} />
                      </Switch>
                  </div>
              </section>
              <div className="footer">
                  <div className="container">
                      <ul className="pull-left footer-menu">
                          <li>
                              <Link to="/" className="navbar-brand">Home</Link>
                          </li>
                      </ul>
                      <ul className="pull-right footer-menu">
                          <li> &copy; Shamim</li>
                      </ul>
                  </div>
              </div>
          </div>
      </div>
    );
  }
}

export default App;
