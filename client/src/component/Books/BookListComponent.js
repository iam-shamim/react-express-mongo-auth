import React from 'react';
export default ({book, filterWithCategory, editBook, deleteBook})=>(
  <div>
      <div>
          <i className="fa fa-book"></i> {book.name}
      </div>
      <div>
          <span><i className="fa fa-pencil"></i> {book.writer}</span>
          <span className="ma-l-20"><i className="fa fa-print"></i> {book.publisher}</span>
          <span className="ma-l-20"><i className="fa fa-language"></i> {book.language.name}</span>
      </div>
      <p>{book.details}</p>
      <div>
          { book.categories.map(cat=> <button onClick={()=>filterWithCategory(cat._id)} className="btn btn-xs btn-default ma-r-5" key={cat._id}>{cat.name}</button>) }
      </div>
      <div>
          <button className="btn btn-xs btn-primary ma-r-5" onClick={()=>editBook(book._id)}><i className="fa fa-pencil"> <span className="ma-l-5">Edit</span></i></button>
          <button className="btn btn-xs btn-danger" onClick={()=>deleteBook(book._id)}><i className="fa fa-trash-o"> <span className="ma-l-5">Delete</span></i></button>
      </div>
      <hr/>
  </div>
);

