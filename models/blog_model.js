const mongoose = require("mongoose");
const config = require("../utils/config");
let DB_URL;
if(config.NODE_ENV === "test" || config.NODE_ENV === "development"){
    DB_URL = config.DB_URL_TEST;
}   
else {
    DB_URL = config.DB_URL_PRODUCTION
}
const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })
  blogSchema.set("toJSON",{
    transform : function (doc,retObj){
      retObj.id = doc._id.toString();
      delete retObj._id;
      delete retObj.__v;
    }
  })
let Blog = mongoose.model("blog",blogSchema);
mongoose.connect(DB_URL).then(()=>{
    console.log("connected to database");
}).catch((err)=>{
    console.error("Unable to connect to database",err.message);
});

module.exports = Blog;
