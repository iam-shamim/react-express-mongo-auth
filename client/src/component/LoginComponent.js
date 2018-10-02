import React, { Component } from 'react';
import { connect } from 'react-redux'
import { login } from "../store/actions/authAction";
import { addFlashMessage } from '../store/actions/flash'
import className from 'classnames';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty'
import { Redirect } from 'react-router-dom'

class LoginComponent extends Component{
    state = {
        identifier: '',
        password: '',
        isLoading: false,
        errors: {}
    };
    validateInput = (data) => {
        let errors = {};
        if(Validator.isEmpty(data.identifier)) errors.identifier = 'This field is required';
        if(Validator.isEmpty(data.password)) errors.password = 'This field is required';

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
            this.setState({ isLoading: true });
            this.props.login({
                identifier: this.state.identifier,
                password: this.state.password
            }).then(()=>{
                this.props.addFlashMessage({
                    type: 'success',
                    text: 'You login successfully. welcome!',
                });
                this.props.history.push("/");
            }).catch((errors)=> {
                this.props.addFlashMessage({
                    type: 'error',
                    text:  errors.response.errors.form,
                });
                this.setState({ isLoading: false })
            });
        }

    };
    render(){
        return(
          <div className="row">
              <div className="col-md-6 col-md-offset-3">
                  <form onSubmit={this.onSubmit}>
                      <div className={className('form-group', 'has-feedback',{ 'has-error': this.state.errors.identifier } )}>
                          <label htmlFor="" className="control-label">User Name / Email</label>
                          <input type="text" className="form-control" name="identifier" value={this.state.identifier} onChange={this.onChange} />
                          <span className="text-danger">{ this.state.errors.identifier }</span>
                      </div>
                      <div className={className('form-group', 'has-feedback',{ 'has-error': this.state.errors.password } )}>
                          <label htmlFor="" className="control-label">Password</label>
                          <input type="password" className="form-control" name="password" value={this.state.password} onChange={this.onChange} />
                          <span className="text-danger">{ this.state.errors.password }</span>
                      </div>
                      <div className="form-group">
                          <button type="submit" className="btn btn-primary" disabled={this.state.isLoading}>Login</button>
                      </div>
                  </form>
              </div>
          </div>
        );
    }
}
export default connect(null, { login, addFlashMessage })(LoginComponent);