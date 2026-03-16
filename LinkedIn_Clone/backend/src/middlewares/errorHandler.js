const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";


    //Mongoose duplicate key error
    if(err.code === 11000){
        const field = Object.keys(err.keyValue)[0];
        message = `${field} already exists.`;
        statusCode = 400;
    }

}