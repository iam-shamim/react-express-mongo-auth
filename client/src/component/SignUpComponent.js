import React, { Component } from 'react';
class SignUpComponent extends Component{
    
    render(){
        return(
          <div className="row">
              <div className="col-md-6 col-md-offset-3">
                  <form>
                      <div className="form-group">
                          <label htmlFor="" className="control-label">Full Name</label>
                          <input type="text" className="form-control"/>
                      </div>
                      <div className="form-group">
                          <label htmlFor="" className="control-label">User Name</label>
                          <input type="text" className="form-control"/>
                      </div>
                      <div className="form-group">
                          <label htmlFor="" className="control-label">Email</label>
                          <input type="text" className="form-control"/>
                      </div>
                      <div className="form-group">
                          <label htmlFor="" className="control-label">Password</label>
                          <input type="text" className="form-control"/>
                      </div>
                      <div className="form-group">
                          <label htmlFor="" className="control-label">Confirm Password</label>
                          <input type="text" className="form-control"/>
                      </div>
                      <div className="form-group">
                          <button type="submit" className="btn btn-primary">Sign up</button>
                      </div>
                  </form>
              </div>
          </div>
        );
    }
}
export default SignUpComponent;