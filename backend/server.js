import express from 'express'
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors'
import users from './routes/users'
import Validator from "validator";
import isEmpty from 'lodash/isEmpty'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from './config';
import authenticate from './middlewares/authenticate';
import commonValidations from './validations/commonValidations';
import YearModel from './Models/YearModel';
import UserModel from './Models/UserModel';



const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connection URL
mongoose.connect('mongodb://localhost:27017/library');


app.get('/api/setup/year',authenticate, (req,res)=>{
    YearModel.find().then((years)=>{
        res.json({ years });
    });
});

app.delete('/api/setup/year',authenticate, (req,res)=>{
    const {  _id } = req.body;
    const update = YearModel.findOneAndDelete({_id:_id}).then(()=>{
        res.json({
            success: true
        })
    });
});
app.put('/api/setup/year',authenticate, (req,res)=>{
    const { yearName, _id } = req.body;
    const { errors, isValid } = commonValidations({yearName},{
        yearName: 'required'
    });

    if(isValid){
        const update = YearModel.findOneAndUpdate({_id:_id},{$set:{name: yearName}},{ new:true }).then((year)=>{
            res.json({ year });
        });
    }else{
        res.status(400).json({ errors });
    }
});
app.post('/api/setup/year',authenticate, (req,res)=>{
    const { yearName } = req.body;
    const { errors, isValid } = commonValidations({yearName},{
        yearName: 'required'
    });

    if(isValid){
        const Year = new YearModel({
            name: yearName
        });
        Year.save().then((year)=>{
            res.json({ year });
        });
    }else{
        res.status(400).json({ errors });
    }
});
app.post('/api/auth',(req,res)=>{
    const { errors, isValid} = validateLoginInput(req.body);
    const { identifier, password} = req.body;
    if(isValid){
        const userFind = UserModel.findOne({
            email: identifier
        }).then((user)=>{
            if(user && bcrypt.compareSync(password,user.password)){
                const token = jwt.sign({
                    _id: user._id,
                    email: user.email
                }, config.jwtSecret);
                res.json({ token });
            }else{
                res.status(401).json({ errors: { form: 'Invalid Credentials'}});
            }
        });
    }else{
        res.status(400).json({ errors });
    }
});


app.use((req, res)=>{
    res.status(404).json({
        errors: {
            global: 'Something wrong.'
        }
    });
});
const validateLoginInput = (data) => {
    let errors = {};

    if(Validator.isEmpty(data.identifier)) errors.identifier = 'This field is required';
    if(Validator.isEmpty(data.password)) errors.password = 'This field is required';

    return {
        errors,
        isValid: isEmpty(errors)
    };
};

app.listen('8081',()=> console.log('Server is running on localhost:8081'));
