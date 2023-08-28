let errorMiddleware = (error,request,response,next) => {
    if(error.name === "Validation Error"){
        return response.status(400).send({error:"please pass a valid value" + error.message});
    }
    if(error.name === "TokenExpiredError"){
        return response.status(401).send({error : "Token Expired"})
    }
    next(error);
}
module.exports = {errorMiddleware};