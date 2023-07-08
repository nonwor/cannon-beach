const express = require('express')
const app = express()

console.log("server running!")
// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('hello world')
})

app.listen(3000);