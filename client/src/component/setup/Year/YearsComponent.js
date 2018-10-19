import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveYear,getYear, updateYear, deleteYear } from "../../../store/actions/setup";
import className from "classnames";
import Validator from "validator";
import isEmpty from 'lodash/isEmpty';
import commonValidations from '../../../validations/commonValidations';
import YearComponent from "./YearComponent";
import Spinner from "../../UI/Spinner/Spinner";

class YearsComponent extends Component{
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
            if(this.state._id === null){
                this.props.saveYear({yearName: e.target.yearName.value}).then(()=>{
                    this.setState({yearName:'',isLoading: false});
                }).catch((err)=>{
                    if(!!err.response.errors){
                        const errors = err.response.errors;
                        this.setState({errors, isLoading: false})
                    }
                });
            }else{
                this.props.updateYear({yearName: e.target.yearName.value,_id: this.state._id}).then(()=>{
                    this.setState({isLoading: false});
                }).catch((err)=>{
                    if(!!err.response.errors){
                        const errors = err.response.errors;
                        this.setState({errors, isLoading: false})
                    }
                });
            }
        }else{
            this.setState({errors});
        }
    };
    editYear = (_id)=>{
        const edit = this.props.years.find((year)=> year._id == _id);
        this.setState({
            _id,
            yearName: edit.name
        })
    };
    deleteYear = (_id)=>{
        this.props.deleteYear({ _id });
    };
    onChange = (event)=>{
        this.setState({
            [event.target.name]: event.target.value
        });
    };
    editCancel = () => {
      this.setState({
          _id: null,
          yearName: '',
      })
    };
    componentWillMount(){
        this.props.getYear();
    }
    render() {
        return <Spinner/>;
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h4 className="panel-title"><a href="#collapseB1" data-toggle="collapse"> Year</a></h4>
                </div>
                <div className="panel-body">
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
                            <div className="col-md-4">
                                <div className="form-group">
                                    {
                                        this.state._id !== null && <button className="btn btn-primary ma-r-5" onClick={this.editCancel}>Cancel</button>
                                    }
                                    <button className="btn btn-success" disabled={this.state.isLoading}>
                                        { this.state._id===null?'Save':'Update' }
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>

                    <div className="row">
                        <div className="col-xs-12">
                            <table className="table table-bordered table-hover table-responsive">
                                <thead>
                                    <tr>
                                        <td>Year Name</td>
                                        <td style={{'width':'30%'}}>
                                            Action
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    this.props.years.map((year, key)=>(
                                        <YearComponent editYear={this.editYear} deleteYear={this.deleteYear} key={key} {...year} editing_id={this.state._id}/>
                                    ))
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps =(state)=> {
    return {
        years: state.setup.years
    }
};
export default connect( mapStateToProps, { saveYear, getYear, updateYear, deleteYear } )(YearsComponent);