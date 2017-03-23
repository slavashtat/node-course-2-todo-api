
const {MongoClient,ObjectID} = require("mongodb"); // same as the code above


MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, db)=>
{
 if(err)
 {
  return console.log("Unable to connect to db server");
 }
 console.log("Connected to db server");

/*
 // deleteMany
db.collection("Todos").deleteMany({text:"play chesss"}).then((result) =>
{
 console.log(result);
});
*/
/*
 //deleteOne
 db.collection("Todos").deleteOne({text:"eat lunch"}).then((result) =>{
  console.log(result);
 })
*/
 //findOneAndDelete
 db.collection("Todos").findOneAndDelete({completed:false}).then((result)=>
 {
  console.log(result);
 });


 //db.close();
});