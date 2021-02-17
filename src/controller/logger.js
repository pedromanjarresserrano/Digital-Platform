const loggerRequest = (req, res, next) => {
    console.log(req.protocol.toUpperCase() + ":" + req.method + ": " + req.ip + " - " + req.originalUrl + "   " + new Date());
    next()
}


module.exports = {
    loggerRequest
}