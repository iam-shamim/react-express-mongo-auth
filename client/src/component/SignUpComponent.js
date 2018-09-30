import React, { Component } from 'react';
import { connect } from 'react-redux'
import { userSignupRequest } from "../store/actions/authAction";
import { addFlashMessage } from '../store/actions/flash'
import className from 'classnames';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty'
import { Redirect } from 'react-router-dom'

class SignUpComponent extends Component{
    state = {
        full_name: '',
        user_name: '',
        email: '',
        password: '',
        confirm_password: '',
        errors: {}
    };
    validateInput = (data) => {
        let errors = {};

        if(Validator.isEmpty(data.full_name)) errors.full_name = 'This field is required';
        if(Validator.isEmpty(data.user_name)) errors.user_name = 'This field is required';
        if(Validator.isEmpty(data.email)) errors.email = 'This field is required';
        if(!Validator.isEmail(data.email)) errors.email = 'Email is invalid';
        if(Validator.isEmpty(data.password)) errors.password = 'This field is required';
        if(Validator.isEmpty(data.confirm_password)) errors.confirm_password = 'This field is required';
        if(!Validator.equals(data.password,data.confirm_password)) errors.confirm_password = 'Password must match';

        return {
            errors,
            isValid: isEmpty(errors)
        };
    };
    onChange = (event)=>{
        this.setState({
            [event.target.name]: event.target.value
        });
    };
    onSubmit = (event)=>{
        this.setState({ errors: {} });
        event.preventDefault();
        const { errors, isValid } = this.validateInput(this.state);
        if(!isValid){
            this.setState({ errors});
        }else{
            this.props.userSignupRequest({
                full_name: this.state.full_name,
                user_name: this.state.user_name,
                email: this.state.email,
                password: this.state.password,
                confirm_password: this.state.confirm_password,
            }).then(()=>{
                this.props.addFlashMessage({
                    type: 'success',
                    text: 'You signed up successfully. welcome!',
                });
                this.props.history.push("/");
            }).catch((errors)=> this.setState({ errors: errors.response.errors }));
        }

    };
    render(){
        return(
          <div className="row">
              <div className="col-md-6 col-md-offset-3">
                  <form onSubmit={this.onSubmit}>
                      <div className={className('form-group', 'has-feedback',{ 'has-error': this.state.errors.full_name } )}>
                          <label htmlFor="" className="control-label">Full Name</label>
                          <input type="text" className="form-control" name="full_name" value={this.state.full_name} onChange={this.onChange} />
                          <span className="text-danger">{ this.state.errors.full_name }</span>
                      </div>
                      <div className={className('form-group', 'has-feedback',{ 'has-error': this.state.errors.user_name } )}>
                          <label htmlFor="" className="control-label">User Name</label>
                          <input type="text" className="form-control" name="user_name" value={this.state.user_name} onChange={this.onChange} />
                          <span className="text-danger">{ this.state.errors.user_name }</span>
                      </div>
                      <div className={className('form-group', 'has-feedback',{ 'has-error': this.state.errors.email } )}>
                          <label htmlFor="" className="control-label">Email</label>
                          <input type="text" className="form-control" name="email" value={this.state.email} onChange={this.onChange} />
                          <span className="text-danger">{ this.state.errors.email }</span>
                      </div>
                      <div className={className('form-group', 'has-feedback',{ 'has-error': this.state.errors.password } )}>
                          <label htmlFor="" className="control-label">Password</label>
                          <input type="password" className="form-control" name="password" value={this.state.password} onChange={this.onChange} />
                          <span className="text-danger">{ this.state.errors.password }</span>
                      </div>
                      <div className={className('form-group', 'has-feedback',{ 'has-error': this.state.errors.confirm_password } )}>
                          <label htmlFor="" className="control-label">Confirm Password</label>
                          <input type="password" className="form-control" name="confirm_password" value={this.state.confirm_password} onChange={this.onChange} />
                          <span className="text-danger">{ this.state.errors.confirm_password }</span>
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
export default connect(null, { userSignupRequest,addFlashMessage })(SignUpComponent);