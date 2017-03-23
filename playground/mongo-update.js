
const {MongoClient,ObjectID} = require("mongodb"); // same as the code above


MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, db)=>
{
 if(err)
 {
  return console.log("Unable to connect to db server");
 }
 console.log("Connected to db server");

/*
 db.collection("Todos").findOneAndUpdate({id: "8d18485d5e31d6cb498bfe0"},{$set: {completed:true}},{retrunOriginal:false}).then((result)=>
 {
  console.log(result);
 });
*/

db.collection("Users").findOneAndUpdate({user: "John"},{$set: {user:"Jack"},$inc:{age:30}},{returnOriginal:false}).then((result)=>
{
 console.log(result);
});

/*
db.collection("Users").findOneAndUpdate({user: "John"},{$set: {user:"Tom"}},{returnOriginal:false}).then((result)=>
{
 console.log(result);
});

db.collection("Users").findOneAndUpdate({user: "Tom"},{$inc: {age:20}},{returnOriginal:false}).then((result)=>
{
 console.log(result);
});
*/
 //db.close();
});