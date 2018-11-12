import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from "react-router-dom";

class InstituteHeader extends Component{
    render(){
        return(
            <div className="account-header">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4 col-md-3 col-lg-2">
                            <div className="profile_avatar">
                                <img src="http://jobs.shamim.rocks/img/people/13f4c2b413086f283eca508f281c0c8b.jpg" alt="avatar" className="img-responsive" id="show" />
                            </div>
                        </div>
                        <div className="col-sm-8 col-md-9 col-lg-10">
                            <div className="profile_summary">
                                <h3 className="profile_name">Nurun Nobi Shamim</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad adipisci aliquid facere ipsum magnam maxime molestiae nemo numquam quod, rerum suscipit tempore temporibus unde? Amet earum eveniet repellat soluta voluptatem!</p>
                                <Link to="/logout" className="btn btn-primary btn-warning btn-sm"><i className="fa fa-sign-out"></i> Sign Out</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps  = (state)=>{
    return {
      messages: state.flashMessages
    };
};
export default connect(mapStateToProps)(InstituteHeader);