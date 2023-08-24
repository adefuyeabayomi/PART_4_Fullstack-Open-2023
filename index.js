const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)
let password = process.argv[2];
console.log("password",password)
const mongoUrl = `mongodb://yomidaniel:${password}@localhost:27017/DB_part_five?authMechanism=DEFAULT&authSource=fullstack_tutorial`;
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)
    console.log("body", request.body,typeof request.body);
  blog
    .save()
    .then(result => {
        console.log("saved",result)
      response.status(201).json(result)
    })
})

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})