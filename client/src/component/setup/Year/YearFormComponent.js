import React, { Component } from 'react';
import className from "classnames";
import commonValidations from "../../../validations/commonValidations";
import { connect } from 'react-redux';
import { saveYear } from "../../../store/actions/setup";

class YearFormComponent extends Component {
    state = {
        _id: null,
        yearName: '',
        errors: {},
        isLoading: false,
    };
    onSubmitHandler = (e)=>{
        e.preventDefault();
        const { errors, isValid } = commonValidations(this.state,{yearName: 'required'});
        if(true || isValid){
            this.setState({isLoading: true});
            this.props.saveYear({yearName: e.target.yearName.value}).then(()=>{
                this.setState({yearName:'',isLoading: false});
            }).catch((err)=>{
                if(!!err.response.errors){
                    const errors = err.response.errors;
                    this.setState({errors, isLoading: false})
                }
            });
        }else{
            this.setState({errors});
        }
    };
    onChange = (event)=>{
        this.setState({
            [event.target.name]: event.target.value
        });
    };
    render() {
        return (
            <form onSubmit={this.onSubmitHandler}>
                <div className="row">
                    <div className="col-md-6 col-md-offset-2">
                        {this.state.errors.global && (<p className="text-danger">{this.state.errors.global}</p>)}
                        <label htmlFor="yearName">New Year</label>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 col-md-offset-2">
                        <div className={className('form-group', 'has-feedback',{ 'has-error': this.state.errors.yearName } )}>
                            <input type="text" autoComplete="off" className="form-control" name="yearName" id="yearName" value={this.state.yearName} onChange={this.onChange}/>
                            <span className="text-danger">{ this.state.errors.yearName }</span>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="form-group">
                            <button className="btn btn-success" disabled={this.state.isLoading}>Save</button>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

export default connect(null, { saveYear })(YearFormComponent);