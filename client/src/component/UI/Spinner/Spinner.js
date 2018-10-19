import React from 'react';
import classes from './Spinner.css'

const Spinner = (props)=>{
    console.log('classes: ',classes);
    return(
        <div className={classes.Loader}>Loading...</div>
    )
};
export default Spinner;