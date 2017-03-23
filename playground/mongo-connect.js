// const MongoClient = require("mongodb").MongoClient;
//const {MongoClient} = require("mongodb"); // same as the code above
const {MongoClient,ObjectID} = require("mongodb"); // same as the code above

/* `example of object ID generation
var obj = new ObjectID();
console.log(obj);
*/

/*
var user = {name:"Andrew", age:25};
var {name} = user;
console.log(name);
*/

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, db)=>
{
 if(err)
 {
  return console.log("Unable to connect to db server");
 }
 console.log("Connected to db server");

/*
 db.collection("Todos").insertOne({
  text: "something to do",
  completed: false
 },(err,result )=>
 {
  if(err)
  {
   return consolue.log("Unable to insert Todo",err);
  }
  console.log(JSON.stringify(result.ops,undefined,2));
 });
*/
/*
 db.collection("Users").insertOne(
 {
  user: "John",
  age: 25,
  location: "London"
 },(err,result )=>
 {
 if(err)
 {
  return consolue.log("Unable to insert User",err);
 }
 console.log(JSON.stringify(result.ops,undefined,2));
});
*/

db.collection("Users").insertOne(
{
 _id:1181923,
 user: "Bill",
 age: 25,
 location: "London"
},(err,result )=>
{
 if(err)
 {
  return console.log("Unable to insert User",err);
 }
 // console.log(JSON.stringify(result.ops,undefined,2));
 console.log(result.ops[0]._id);
 console.log("==========");
 console.log(result.ops[0]._id.getTimestamp());

 // this function did not work when I tested it
});


 db.close();
});