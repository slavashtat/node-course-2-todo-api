const expect = require("expect");
const request = require("supertest");

const {app} = require("./../server");
const {Todo} =  require("./../models/todo");
const {ObjectID} = require('mongodb');

/*
beforeEach((done)=>
{
 Todo.remove({}).then(()=> done());
});
*/

const todos =
[
 {
  _id: new ObjectID(),
  text:"Play games"
 },
 {
  _id: new ObjectID(),
  text:"Smoke"
 }
];

beforeEach((done)=>
{
 Todo.remove({}).then(()=> {
  // return Todo.save(todos);  // does not work here
  return Todo.insertMany(todos);
 }).then(()=>done());
});



describe("Post /todos",() =>
{
 it('should create a new todo',(done)=>
 {
  var text = "Make a choice";
  request(app)
  .post('/todos')
  .send({text})
  .expect(200)
  .expect((res)=>
  {
   expect(res.body.text).toBe(text);
  })
  .end((err,res) =>
  {
   if(err)
   {
    return done(err);
   }
   Todo.find({text}).then((todos)=>
   {
    expect(todos.length).toBe(1);
    expect(todos[0].text).toBe(text);
    done();
   }).catch((e)=>
   {
   done(e);
   });
  });
 }); //it
 it('should not create a todo with invalid data',(done)=>
 {
  request(app)
  .post('/todos')
  .send({})
  .expect(400)
  .end((err,res) =>
  {
   if(err)
   {
    return done(err);
   }
   Todo.find().then((todos)=>
   {
    expect(todos.length).toBe(2);
    //expect(todos[0].text).toBe(text);
    done();
   }).catch((e)=> {
    done(e);
   });
  });
 });
}); //describe


describe("Get /todos",()=>
{
 it("It should get all todos",(done)=>
 {
  request(app)
  .get('/todos')
  .expect(200)
  .expect((res)=>{
   expect(res.body.todos.length).toBe(2);
  })
  .end(done) // as we are not doing anything async, we don't do
             // end((err,res) => {}
 });
});

/*
describe("Get /todos",()=>
{
 it("It should get all todos",(done)=>
 {
  request(app)
  .get('/todos')
  .expect(200)
  .expect((res)=>{
   expect(res.body.todos.length).toBe(2);
  })
  .end((err,res) =>
  {
   if(err)
   {
    return done(err);
   }
   done();
  });
 });
}); //describe
*/

describe("GET /todos/:id  ",()=>{
 it("Should return todo doc",(done)=>
 {
  // use supertest library now
  request(app)
  .get(`/todos/${todos[0]._id.toHexString()}`)
  .expect(200)
  // custom expect call now
  .expect((res)=>
  {
   expect(res.body.todo.text).toBe(todos[0].text)
  })
  .end(done);
 });

 it("should return 404 if todo ID is not found",(done)=>
 {
  var id = new ObjectID();
  // use supertest library now
  request(app)
  .get(`/todos/${id.toHexString()}`)
  .expect(404)
  .end(done);
 });
 it("should return 404 if todo ID is invalid",(done)=>
 {
  var id = "someID1234";
  // use supertest library now
  request(app)
  .get(`/todos/${id}`)
  .expect(404)
  .end(done);
 });


});