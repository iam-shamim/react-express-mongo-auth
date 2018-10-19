import React, { Component } from 'react';
import LeftMenuComponent from "./LeftMenuComponent";
import InstituteComponent from "./InstituteComponent";
import {Link, Route, Switch} from 'react-router-dom'
import requireAuth from "../utils/requireAuth";
import NewEventPage from "./events/NewEventPage";
import notAuth from "../utils/notAuth";
import SignUpComponent from "./SignUpComponent";
import LoginComponent from "./LoginComponent";
import LogoutComponent from "./LogoutComponent";
import YearsComponent from "./setup/Year/YearsComponent";

class HomeComponent extends Component{
    render(){
        return(
            <div className="row">
                <div className="col-md-3 col-sm-3">
                    <LeftMenuComponent/>
                </div>
                <div className="col-md-9 col-sm-9">
                    <Switch>
                        <Route path="/setup/year" exact  component={requireAuth(YearsComponent)} />
                        <Route path="/institute" exact  component={InstituteComponent} />
                    </Switch>
                </div>
            </div>
        );
    }
}
export default HomeComponent;