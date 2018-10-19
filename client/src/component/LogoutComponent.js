import React, { Component } from 'react';
import { connect } from 'react-redux'
import { userSignupRequest } from "../store/actions/authAction";
import { addFlashMessage } from '../store/actions/flash'
import className from 'classnames';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty'
import { Redirect } from 'react-router-dom'
import { logout } from "../store/actions/authAction";

class LogoutComponent extends Component{
    componentWillMount(){
        this.props.logout();
    }
    render(){
        return(
            <span></span>
        );
    }
}
export default connect(null, { logout })(LogoutComponent);