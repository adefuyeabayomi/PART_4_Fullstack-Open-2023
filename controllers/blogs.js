let blogRouter = require("express").Router()
let Blog = require("../models/blog_model")
let User = require("../models/user_model")
let mongoose = require("mongoose");
let jwt = require("jsonwebtoken");
let config = require("../utils/config");

blogRouter.get('/api/blogs', (request, response) => {
    Blog
      .find({}).populate("user")
      .then(blogs => {
        blogs = blogs.map(x=>{
            x.user.password = undefined;
            return x;
        })
        response.json(blogs)
      })
  })
blogRouter.post('/api/blogs',async (request, response,next) => {
    let token = request.token;
    console.log("token",token)
    let decodedToken
    try {
        decodedToken = jwt.verify(token, config.SECRET)        
    }
    catch(err){
        return next(err);
    }

    console.log("decoded",decodedToken,config.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'Unauthorized' })
    }
    const user = await User.findById(decodedToken.id)
    if(!request.body.likes){
        request.body.likes = 0;
    }
    if(!request.body.url || !request.body.title){
        response.status(400).json(request.body);
    }
    else {  
        let document = {...request.body,user: user._id}
        console.log("document",document,"user's name",user.username);
        const blog = new Blog(document)
        blog
        .save()
        .then(result => {
            User.updateOne({_id : user._id},{ $addToSet : {
                    blogs : result._id
                }
            }).then(res=>{
                console.log("updated the user's blog",res);
            })
            console.log("saved",result)
            response.status(201).json(result)
        }).catch(err=>{
            next(err)
        })                 
    }
  })
  blogRouter.get("/api/blogs/:id",(request,response)=>{
    let id = request.params.id;
    Blog.findById(id).then(res=>{
        response.status(200).send(res);
    }).catch(err=>{
        console.error("unable to retrieve blog",id,err.message)
        response.status(404).send(err.message);
    })
  })

  blogRouter.delete("/api/blogs/:id",(request,response)=>{
    let id = request.params.id;
    Blog.deleteOne({_id:id}).then(res=>{
        console.log("id",id,"deleted",res)
        response.status(204).send(res);
    }).catch(err=>{
        console.error("unable to delete ",id,err.message)
        response.status(400).send(err.message);
    })
  })
  blogRouter.put("/api/blogs/:id",(request,response)=>{
    let id = request.params.id;
    let updateDoc = request.body
    Blog.updateOne({_id:id},updateDoc).then(res=>{
        console.log("id",id,"updated",res)
        response.status(200).send(res);
    }).catch(err=>{
        console.error("unable to update ",id,err.message)
        response.status(400).send(err.message);
    })
  })

  module.exports = blogRouter;