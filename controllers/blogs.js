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
    if(!request.body.likes){
        request.body.likes = 0;
    }
    if(!request.body.url || !request.body.title){
        response.status(400).json(request.body);
    }
    else {
        const blog = new Blog(request.body)
        console.log("body", request.body,typeof request.body);
        blog
        .save()
        .then(result => {
            console.log("saved",result)
            response.status(201).json(result)
        })        
    }
  })
  blogRouter.delete("/api/blogs/:id",(request,response)=>{
    let id = request.params.id;
    Blog.deleteOne({_id:id}).then(res=>{
        console.log("id",id,"deleted")
        response.status(204).send(res);
    }).catch(err=>{
        console.error("unable to delete ",id,err.message)
        response.status(400).send(err.message);
    })
  })

  module.exports = blogRouter;