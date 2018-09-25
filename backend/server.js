import express from 'express'
import mongodb from 'mongodb';
import bodyParser from 'body-parser';
import cors from 'cors'
import path from 'path';

var ObjectId = mongodb.ObjectID;
var MongoClient = mongodb.MongoClient;

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'product_crud';

const productValid = (data) => {
    try{
        let errors = {};
        if(data.title.trim() === '') errors.title = "Can't be empty";
        if(data.description.trim() === '') errors.description = "Can't be empty";
        const isValid = Object.keys(errors).length === 0;
        return {isValid, errors}
    }catch (e) {
        return {isValid:false, errors:{
            global: e.message
        }}
    }

};

MongoClient.connect(url, function (err, client) {
    if (err) throw err;
    var db = client.db(dbName);
    app.get('/api/products',(req,res) => {
        db.collection('products').find({}).toArray().then(products => {
            res.json({ products });
        });
    });
    app.get('/',(req,res)=>{
        res.sendFile(path.join(__dirname,'./index.html'));
    });
    app.get('/api/products/:_id',(req,res) => {
        db.collection('products').findOne({_id: new ObjectId(req.params._id)}).then(product => {
            res.json({ product });
        });
    });
    app.post("/api/products/store",(req,res)=>{
        try{
            const {isValid, errors} = productValid(req.body);
            if(!isValid){
                res.status(400).json({ errors });
            }
            const {title,description} = req.body;
            db.collection('products').insertOne({
                title, description
            }).then(result => {
                res.json({
                    product: result.ops[0]
                });
            }).catch(err => {
                throw err.message;
            });
        }catch (e) {
            res.status(404).json({errors:{
                global: e.message
            }});
        }
    });
    app.put("/api/products/:_id",(req,res)=>{
        try{
            const {isValid, errors} = productValid(req.body);
            if(!isValid){
                res.status(400).json({ errors });
            }
            const {title,description} = req.body;
            db.collection('products').updateOne({
                _id: new ObjectId(req.params._id)
            },{
              $set: { title, description }
            });
            res.json({

            });
        }catch (e) {
            res.status(404).json({errors:{
                global: e.message
            }});
        }
    });
    app.delete("/api/products/:_id",(req,res)=>{
        try{
            db.collection('products').remove({
                _id: new ObjectId(req.params._id)
            });
            res.json({});
        }catch (e) {
            res.status(404).json({errors:{
                global: e.message
            }});
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
});