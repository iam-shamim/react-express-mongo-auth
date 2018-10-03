import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from "../store/actions/authAction";

class NavBarComponent extends Component {
    onLogout = (e) => {
        e.preventDefault();
        this.props.logout()
    };
    render(){
        const { isAuthenticated } = this.props.auth;
        const userLinks = (
            <ul className="nav navbar-nav navbar-right">
                <li><Link to="new-event">New Event</Link></li>
                <li><a href="#" onClick={this.onLogout}>Logout</a></li>
            </ul>
        );
        const guestLinks = (
            <ul className="nav navbar-nav navbar-right">
                <li><Link to="login">Login</Link></li>
                <li><Link to="signup">Sign up</Link></li>
            </ul>
        );
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <Link to="/" className="navbar-brand">Home</Link>
                    </div>
                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        { isAuthenticated? userLinks : guestLinks }
                    </div>
                </div>
            </nav>
        );
    }
}
function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}
export default connect(mapStateToProps, { logout })(NavBarComponent);