var mongoose =  require ("mongoose");

var User = mongoose.model("User",
 {
  email:
  {
   type: String,
   required: true,
   minlength:1,
   trim: true // remove spaces before and after
  },
 });

module.exports ={User};