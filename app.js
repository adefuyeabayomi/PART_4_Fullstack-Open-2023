const express = require('express')
const app = express()
const cors = require('cors')
const blogController = require("./controllers/blogs")
const middleware = require("./utils/middleware")

app.use(cors())
app.use(express.json())
app.use(blogController)
app.use(middleware.errorMiddleware);

module.exports = app;