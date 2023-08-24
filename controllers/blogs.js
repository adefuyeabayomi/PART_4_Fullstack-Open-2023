let blogRouter = require("express").Router()
let Blog = require("../models/blog_model")

blogRouter.get('/api/blogs', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })
blogRouter.post('/api/blogs', (request, response) => {
    const blog = new Blog(request.body)
      console.log("body", request.body,typeof request.body);
    blog
      .save()
      .then(result => {
          console.log("saved",result)
        response.status(201).json(result)
      })
  })

  module.exports = blogRouter;