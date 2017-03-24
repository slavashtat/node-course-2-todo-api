var mongoose = require("mongoose");

mongoose.Promise = global.Promise; // As mongoose deoes not know which promiss library to use
mongoose.connect("mongodb://localhost:27017/TodoApp");


module.export = {mongoose};