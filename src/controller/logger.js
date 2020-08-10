const loggerRequest = (req, res, next) => {
    console.log(req.protocol + ":" + req.method + ": " + req.hostname + " - " + req.path);
    next()
}


module.exports = {
    loggerRequest
}