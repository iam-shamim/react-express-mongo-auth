import express from 'express'
import mongodb from 'mongodb';
import bodyParser from 'body-parser';
import cors from 'cors'
import users from './routes/users'

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



MongoClient.connect(url, function (err, client) {
    if (err) throw err;
    var db = client.db(dbName);
    app.use('/api/users',users);

    app.use((req, res)=>{
        res.status(404).json({
            errors: {
                global: 'Something wrong.'
            }
        });
    });

    app.listen('8081',()=> console.log('Server is running on localhost:8081'));
});