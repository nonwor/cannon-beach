const express = require('express');
const dotenv = require('dotenv');

dotenv.config(); 
require('./config/database.cjs')

const app = express();
app.use(express.json());

console.log("server running!")

const {getUsers, createUsers} = require('./controllers/users.cjs')
// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('hello world')
})

app.get('/users', getUsers)
app.post('/users', createUsers)

app.listen(3000);