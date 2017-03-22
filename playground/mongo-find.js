
const {MongoClient,ObjectID} = require("mongodb"); // same as the code above


MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, db)=>
{
 if(err)
 {
  return console.log("Unable to connect to db server");
 }
 console.log("Connected to db server");

/*
 //db.collection("Todos").find({completed:false}).toArray().then((docs)=>
 db.collection("Todos").find(
  {
  _id: new ObjectID("58d18485d5e31d6cb498bfe0")
  }).toArray().then((docs)=>

 {
  console.log("Todos");
  console.log(JSON.stringify(docs,undefined,2));

 },(err) =>
 {
  console.log("Could not fetch all records",err);
 });
*/


//db.collection("Todos").find({completed:false}).toArray().then((docs)=>
db.collection("Todos").find().count().then((count)=>

{
 console.log("Todos count",count);
},(err) =>
{
 console.log("Could not fetch all records",err);
});

db.collection("Users").find({user: "John"}).toArray().then((docs)=>
{
 console.log(JSON.stringify(docs,undefined,2));
},(err) =>
{
 console.log("Could not fetch all records",err);
});


 //db.close();
});