import React, { Component } from 'react';
import { connect } from 'react-redux'
class HomeComponent extends Component{
    render(){
        return(
          <div className="row">
              <div className="col-md-6 col-md-offset-3">
                  <h1>Hello world!</h1>
              </div>
          </div>
        );
    }
}
export default HomeComponent;