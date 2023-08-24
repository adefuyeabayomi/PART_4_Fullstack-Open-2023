const mongoose = require("mongoose");
let DB_URL = require("../utils/config").DB_URL;
const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })
let Blog = mongoose.model("blog",blogSchema);
mongoose.connect(DB_URL).then(()=>{
    console.log("connected to database");
}).catch((err)=>{
    console.error("Unable to connect to database",err.message);
});

module.exports = Blog;
