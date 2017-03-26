const {ObjectID} = require('mongodb');

const {mongoose} = require("./../server/db/mongoose");
const {Todo} =     require("./../server/models/todo");
const {User} =     require("./../server/models/user");

// remove multiple records
/*
Todo.remove({}).then( (result) =>
{
 console.log(result);
});
*/

// Find and remove
Todo.findOneAndRemove({"text":"do something"}).then( (todo)=>
{
console.log(todo);
});

// Find by Id and remove
/*
//Todo.findByIdANdRemove
{
 Todo.findByIdAndRemove(`58d709c7e83060eebf857cc9`).then((todo)=>
 console.log(todo);
});
*/