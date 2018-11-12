import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBooks, bookDelete } from "../../store/actions/book";
import Pagination from "react-js-pagination";
import { toastr } from 'react-redux-toastr';
import BookListComponent from "./BookListComponent";
import Spinner from "../UI/Spinner/Spinner";
import * as qs from 'query-string';
import Modal from "../UI/Modal/Modal";

/*import className from "classnames";
import commonValidations from '../../validations/commonValidations';
import css from './css/AddBooksComponent.css';
import Aux from '../../hoc/Aux'
import CategoryComponent from "../setup/Category/CategoryComponent";*/

class BooksListComponent extends Component{
    state = {
        errors: {},
        isLoading: false,
        delete_info:{
            modal: false,
            title: null,
            id: null,
        },
        dataLoading: false
    };


    componentDidMount(){
        const param = qs.parse(this.props.location.search);
        param.page = param.page?param.page:1;
        if(this.props.bookList.docs.length===0){
            this.setState({dataLoading: true});
        }
        this.props.getBooks(param).then(()=>{
            this.setState({dataLoading: false})
        }).catch((errors)=>{
            if(errors.response.errors._flash){
                toastr.error("Error",errors.response.errors._flash);
                this.setState({ dataLoading: false})
            }
        })
    }
    filterWithCategory = (_id)=>{
        this.props.history.push('?category='+_id);

    };
    editBook = (_id)=>{
        this.props.history.push("/books/"+_id+'/edit');

    };
    deleteBook = (_id)=>{
        //this.props.history.push("/books/"+_id+'/edit');
        const find = this.props.bookList.docs.find((category)=> category._id === _id);
        this.setState({
            delete_info: {
                modal: true,
                title: find.name,
                _id: find._id
            }
        });

    };
    deleteCancel = ()=>{
        this.setState({
            delete_info: {
                modal: false
            }
        });
    };
    deleteConfirm = ()=>{
        console.log("Confirm delete");

        this.props.bookDelete({ _id: this.state.delete_info._id }).then(()=>{
            const newState = {
                delete_info: {modal: false}
            };
            if(this.state.delete_info._id === this.state._id){
                newState._id = null;
                newState.name = '';
            }
            this.setState(newState);
            toastr.success('Success','Book successfully deleted');
        }).catch((errors)=>{
            if(errors.response.errors._flash){
                toastr.error("Error",errors.response.errors._flash);
                this.setState({ isLoading: false})
            }else{
                this.setState({ isLoading: false, errors: errors.response.errors })
            }
        });
    };
    handlePageChange = (props)=>{
        const param = qs.parse(this.props.location.search);
        if(props != param.page){
            param.page = props;
            this.props.history.push('?'+qs.stringify(param))
        }

    };
    render() {
        let data = null;
        if(this.state.dataLoading){
            data = <Spinner/>;
        }else if(this.props.bookList.docs.length === 0){
            data = <p className="text-center">Not found</p>
        }else{
            let sl = 1;
            data = this.props.bookList.docs.map(book=>(<BookListComponent key={book._id} book={book} deleteBook={this.deleteBook} editBook={this.editBook} filterWithCategory={this.filterWithCategory} />)) ;
        }
        return (
            <div className="panel panel-default">
                <Modal show={this.state.delete_info.modal} modalClosed={this.deleteCancel}>
                    <h4 className="text-center">Are you sure?</h4>
                    <hr/>
                    You want to delete: {this.state.delete_info.title}
                    <hr/>
                    <div className="pull-right">
                        <button className="ma-r-5 btn btn-sm btn-default" onClick={this.deleteCancel}>No, cancel please</button>
                        <button className="btn btn-sm btn-danger" onClick={this.deleteConfirm}>
                            <span className="fa fa-trash-o fa-1-2x"></span> Yes, delete it!
                        </button>
                    </div>
                </Modal>
                <div className="panel-heading">
                    <h4 className="panel-title"><a href="#collapseB1" data-toggle="collapse"> Book List</a></h4>
                </div>
                <div className="panel-body">
                    {data}
                   <div className="text-center">
                       {
                           this.props.bookList.pages>1 &&
                               <Pagination
                                   activePage={this.props.bookList.page}
                                   itemsCountPerPage={this.props.bookList.limit}
                                   totalItemsCount={this.props.bookList.total}
                                   pageRangeDisplayed={5}
                                   onChange={this.handlePageChange}
                               />
                       }
                   </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps =(state)=> {
    return {
        bookList: state.book.bookList
    }
};
export default connect( mapStateToProps, { getBooks,bookDelete } )(BooksListComponent);