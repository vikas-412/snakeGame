const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
const routes = require('./routes');
const path = require('path');
const ai = require('backend.ai-client');

var axios = require('axios');


let port = process.env.PORT || 3000;

const app = express();
app.use(express.static(path.resolve(__dirname, 'abc', 'cd')))//To access static folder directly without the use of routing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

process.env.BACKEND_ACCESS_KEY = 'AKIACCJ5PM3AEZSADZ62'
process.env.BACKEND_SECRET_KEY = 'y6V-O9QluKC8HO1rq2DF-HWZWAVS9dpZPHACvlRW'
process.env.BACKEND_ENDPOINT = 'https://api.backend.ai';

mongoose.connect('mongodb://localhost/snakegamedb');
const db = mongoose.connection;
db.on('error', () => { console.log('Database connection error') });
db.once('open', () => { console.log('Database is connected') });

app.set('superSecret', 'secretkey');
// let apiRouters = express.Router();

// apiRouters.post('/authenticate', (req, res) => {
//     User.findOne({ name: req.body.name }, (err, data) => {
//         if (err) throw err;

//         if (data) {
//             if (req.body.password === data.password) {
//                 const payload = {
//                     admin: data.admin
//                 }
//                 let token = jwt.sign(payload,'superSecret',{
//                     expiresIn : 114
//                 });
//                 res.send({
//                     status : true,
//                     message: 'token',
//                     token : token
//                 })

//             } else {
//                 res.send({
//                     status: false,
//                     message: 'Wrong password'
//                 });
//             }
//         } else {
//             res.send({
//                 status: false,
//                 message: 'User does not exist'
//             });
//         }
//     })
// })

// app.use('/api', apiRouters);

app.use((req, res, next) => {
  console.log('req detected');
  next();
})
routes(app);

app.listen(port, () => {
  console.log('Server running', port);
})