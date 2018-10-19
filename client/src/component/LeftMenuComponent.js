import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
class LeftMenuComponent extends Component{
    render(){
        return(
            <div className="widget">
                <div className="widget-header">
                    <h3>Profile</h3>
                </div>
                <div className="widget-body">
                    <ul className="author-menus">
                        <li>
                            <a href="#" className="dropdown"><i className="fa fa-wrench"></i> Setup</a>
                            <ul className="author-menus-sub">
                                <li><Link to="/setup/year"><i className="fa fa-angle-right"></i> Year setup </Link></li>
                                <li><Link to="/setup/department"><i className="fa fa-angle-right"></i> Department setup </Link></li>
                                <li><Link to="/shift/department"><i className="fa fa-angle-right"></i> Shift setup </Link></li>
                            </ul>
                        </li>
                        <li><a href="#">My Experiences</a></li>
                        <li><a href="#">My Skills</a></li>
                        <li><a href="#">My Education</a></li>
                        <li><a href="#">About Me</a></li>
                        <li><a href="#">My Recommendations</a></li>
                        <li><a href="#">Signout</a></li>
                    </ul>
                </div>
            </div>
        );
    }
}
export default LeftMenuComponent;