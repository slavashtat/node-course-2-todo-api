var mongoose = require("mongoose");

mongoose.Promise = global.Promise; // As mongoose deoes not know which promiss library to use
mongoose.connect(process.env.MONGODB_URI);


module.export = {mongoose};

// process.env.NODE_ENV