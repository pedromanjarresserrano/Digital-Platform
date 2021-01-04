const loggerRequest = (req, res, next) => {
    console.log(req.protocol.toUpperCase() + ":" + req.method + ": " + req.hostname + " - " + req.originalUrl);
    next()
}


module.exports = {
    loggerRequest
}