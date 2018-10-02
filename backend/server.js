import express from 'express'
import mongodb from 'mongodb';
import bodyParser from 'body-parser';
import cors from 'cors'
import users from './routes/users'
import Validator from "validator";
import isEmpty from 'lodash/isEmpty'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from './config';


var ObjectId = mongodb.ObjectID;
var MongoClient = mongodb.MongoClient;

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'build_react_app';



MongoClient.connect(url, function (err, client) {
    if (err) throw err;
    var db = client.db(dbName);
    app.use('/api/users',(req,res)=>{
        validateInput(req.body, commonValidations).then(({ errors, isValid})=>{
            if(isValid){
                const { full_name, user_name, email, password} = req.body;
                const password_digest = bcrypt.hashSync(password, 10);
                db.collection('users').insert({
                    full_name,
                    user_name,
                    email,
                    password: password_digest
                });
                res.send(req.body);
            }else{
                res.status(400).json({ errors });
            }
        });
    });
    app.use('/api/auth',(req,res)=>{
        const { errors, isValid} = validateLoginInput(req.body);
        const { identifier, password} = req.body;
        if(isValid){
            db.collection('users').findOne({
                $or:[
                    {email: identifier},
                    {user_name: identifier}
                ]
            }).then(user=>{
                if(user){
                    if(bcrypt.compareSync(password,user.password)){
                        const token = jwt.sign({
                            id: user._id,
                            user_name: user.user_name
                        }, config.jwtSecret);
                        res.json({ token });

                    }else{
                        res.status(401).json({ errors: { form: 'Invalid Credentials'}});
                    }
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

    const validateInput = (data,otherValidation)=> {
        let { errors } = otherValidation(data);

        return Promise.all([
            db.collection('users').findOne({email: data.email}).then(res=>{
                if(res) { errors.email = 'There is user with such email' }
            }),
            db.collection('users').findOne({user_name: data.user_name}).then(res=>{
                if(res) { errors.user_name = 'There is user with such username' }
            })
        ]).then(()=>{
            return {
                errors,
                isValid: isEmpty(errors)
            }
        });


    };
    const commonValidations = (data) => {
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
    const validateLoginInput = (data) => {
        let errors = {};

        if(Validator.isEmpty(data.identifier)) errors.identifier = 'This field is required';
        if(Validator.isEmpty(data.password)) errors.password = 'This field is required';

        return {
            errors,
            isValid: isEmpty(errors)
        };
    };
});