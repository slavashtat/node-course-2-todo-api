const {ObjectID} = require('mongodb');

const {mongoose} = require("./../server/db/mongoose");
const {Todo} =     require("./../server/models/todo");
const {User} =     require("./../server/models/user");

//var id = "58d59751b88c7b551f854221_";

/*
if (!ObjectID.isValid(id))
{
 console.log("ID is invalid");

}
*/
/*
Todo.find(
{
 _id: id
}).then((todos) =>
{
 console.log("Todos",todos);
}).catch( (e) =>
{
 console.log(e);
});
*/

// Version equal to the one above? At least it also works
/*
Todo.find(
{
_id: id
}).then((todos) =>
{
console.log("Todos",todos);
}, (e) =>
{
console.log(e);
});
*/

/*
Todo.find({
_id: id
}).then((todos) =>
{
console.log("Todos",todos);
});

Todo.findOne({
_id: id
}).then((todo) =>
{
console.log("Todo",todo);
});
*/

/*
Todo.findById(id).then((todo) =>
{
 if(!todo){
  return console.log("Todo by ID not found");

 }

console.log("Todo by ID",todo);
}).catch( (e)=>{
console.log(e);
});
*/


var id1 = "58d40ff109f8efbd11d481fb";

/*
if(!ObjectID.isValid(id1))
{
 console.log("ID is invalid");
}
*/

User.findById("58d40ff109f8efbd11d481fa").then((user) =>
{
 if(!user)
 {
  return console.log("user by ID not found");
 }
 console.log(JSON.stringify ( user, undefined, 2 ));
},(e)=>
{
 console.log(e);
});

