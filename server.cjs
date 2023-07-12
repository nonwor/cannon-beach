const express = require('express');
const dotenv = require('dotenv');

dotenv.config(); 
require('./config/database.cjs')

const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json());

console.log("server running!")

const {getUsers, createUsers, getUsersId, updateUsage, updateCredit} = require('./controllers/users.cjs')
// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('hello world')
})

app.get('/users', getUsers)
app.get('/users/:id', getUsersId)
app.post('/users', createUsers)
app.put('/users/usage/:id/:usage', updateUsage)
app.put('/users/credit/:id/:credit', updateCredit)

app.listen(3000);