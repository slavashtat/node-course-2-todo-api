require("./config/config");

const _ =require("lodash");
var express = require("express");
var bodyParser = require("body-parser");


var {mongoose} =  require ("./db/mongoose");
var {Todo} =require ("./models/todo");
var {User} =require ("./models/user");
const {ObjectID} = require('mongodb');


var app = express();
const port = process.env.PORT;

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


app.delete("/todos/:id",(req,res)=>
{
 // get the id
 var id = req.params.id;

 // validate the id --> not valid, return 404
 if (!ObjectID.isValid(id))
 {
  var body = id + " invalid object id";
  //return res.status(404).send(body);
  return res.status(404).send();
 }

 // remove todo by id Todo.findByIdANdRemove
 Todo.findByIdAndRemove(id).then((todo)=>   // success
 {
  // if no doc send 404
  if(!todo)
  {
   return res.status(404).send();
  }
  // if doc - send doc back with 200
  res.send({todo});
 }).catch( (e)=> // errot - 400
 {
  res.status(400).send();
 });
});

app.patch("/todos/:id",(req,res)=>{
 // get the id
 var id = req.params.id;
 var body = _.pick(req.body,["text","completed"]);

 if (!ObjectID.isValid(id))
 {
  var body = id + " invalid object id";
  //return res.status(404).send(body);
  return res.status(404).send();
 }

 if(_.isBoolean(body.completed)&& body.completed){
  body.completedAt = new Date().getTime(); // number of ms since Jan 1 1970
 }else{
   body.completed = false;
   body.completedAt = null;
 }
 console.log("1111");
 console.log(body.completed);


 Todo.findByIdAndUpdate(id,{$set: body},{new: true}).then((todo)=>{
  console.log("body");
  console.log(body);
  console.log("todo");
  console.log(todo);

  if(!todo) {
   return res.status(404).send();
  }
  res.send({todo});
 }).catch((e)=>{
  console.log("400");
  console.log(e);
  res.status(400).send();
 })
});


app.listen(port, () =>{
 console.log(`Started on port ${port}`);
});

module.exports = {app};
/////////////


