var env = process.env.NODE_ENV|| "development";  // heroku sets it to "production", otherwise is by default undefined
//.. but we can set it ourselves in the package.json file

if(env ==="development") {
process.env.PORT = 3000;
process.env.MONGODB_URI = "mongodb://localhost:27017/TodoApp";
}else if (env ==="test"){
process.env.PORT = 3000;
process.env.MONGODB_URI = "mongodb://localhost:27017/TodoAppTest";
}