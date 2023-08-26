let errorMiddleware = (error,request,response,next) => {
    if(error.name === "Validation Error"){
        return response.status(400).send({error:"please pass a valid value" + error.message});
    }

    next(error);
}
module.exports = {errorMiddleware};