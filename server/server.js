var express = require("express");
var bodyParser = require("body-parser");

var {mongoose} =  require ("./db/mongoose");
var {Todo} =require ("./models/todo");
var {User} =require ("./models/user");
const {ObjectID} = require('mongodb');


var app = express();
const port = process.env.PORT || 3000;

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


app.get('/todos', (req, res) => {

  // Where todos os an array
 Todo.find().then((todos)=>
 {
  res.send({todos});
 }).catch((e)=>
 {
  res.status(400).send(e);
 });
});


app.get("/todos/:id",(req,res)=>
{
 var id = req.params.id;
 if (!ObjectID.isValid(id))
 {
  var body = id + " invalid object id";
  //return res.status(404).send(body);
  return res.status(404).send();
 }

 Todo.findById(id).then((todo)=>
 {
  if(!todo)
  {
   return res.status(404).send();
  }

  res.send({todo});
 }).catch( (e)=>
 {
  res.status(400).send();
 });
});









app.listen(port, () =>{
 console.log(`Started on port ${port}`);
});

module.exports = {app};
/////////////


