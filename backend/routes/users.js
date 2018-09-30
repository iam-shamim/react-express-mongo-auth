import express from 'express';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty'

let router = express.Router();

const validateInput = (data) => {
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

router.post('/',(req,res)=>{
    const { errors, isValid } = validateInput(req.body);

    if(!isValid){
        res.status(400).json({ errors });
    }
    res.send(req.body);
});


export default router;