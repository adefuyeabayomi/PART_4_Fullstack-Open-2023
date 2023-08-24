const express = require('express')
const app = express()
const cors = require('cors')
const config = require("./utils/config");
const logger = require("./utils/logger");
const blogController = require("./controllers/blogs")
const middleware = require("./utils/middleware")

app.use(cors())
app.use(express.json())
app.use(blogController)
app.use(middleware.errorMiddleware);

let PORT = config.PORT;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})