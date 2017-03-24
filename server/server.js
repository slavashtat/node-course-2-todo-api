var express = require("express");
var bodyParser = require("body-parser");

var {mongoose} =  require ("./db/mongoose");
var {Todo} =require ("./models/todo");
var {User} =require ("./models/user");

var app = express();

// Returns middleware that only parses json. This parser accepts any Unicode
// encoding of the body and supports automatic inflation of gzip and deflate
// encodings.
app.use(bodyParser.json());


app.post('/todos', (req, res) => {
 var todo = new Todo({
  text: req.body.text
 });

 todo.save().then((doc) => {
  res.send(doc);
 }, (e) => {
  res.status(400).send(e);
 });
});


app.listen(3000, () =>{
 console.log("Started on port 3000");
});

module.exports = {app};
/////////////


