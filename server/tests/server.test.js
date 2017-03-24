const expect = require("expect");
const request = require("supertest");

const {app} = require("./../server");
const {Todo} =  require("./../models/todo");

/*
beforeEach((done)=>
{
 Todo.remove({}).then(()=> done());
});
*/

const todos =
[
 {
  text:"Play games"
 },
 {
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