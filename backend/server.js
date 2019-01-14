import express from 'express'
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors'
import year from './routes/year'
import department from './routes/department'
import shift from './routes/shift'
import language from './routes/language'
import category from './routes/category'
import books from './routes/books'
import students from './routes/students'

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from './config';
import UserModel from './Models/UserModel';
import commonValidations from "./validations/commonValidations";



const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connection URL
mongoose.connect('mongodb://localhost:27017/library');


app.use('/api/students',students);
app.use('/api/setup/years',year);
app.use('/api/setup/departments',department);
app.use('/api/setup/shifts',shift);
app.use('/api/setup/languages',language);
app.use('/api/setup/categories',category);
app.use('/api/books',books);
app.post('/api/auth',(req,res)=>{
    const { identifier, password} = req.body;
    const { errors, isValid } = commonValidations({identifier,password},{
        identifier: 'required',
        password: 'required',
    });
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
                res.status(401).json({ errors: { global: 'Invalid Credentials'}});
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

app.listen('8081',()=> console.log('Server is running on localhost:8081'));
