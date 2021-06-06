function logger(req, res, next) {
    console.log("== Got a new request:")
    console.log(" -- req.url: ", req.url)
    console.log(" -- req.method: ", req.method)
    console.log(" -- req.headers: ", req.headers)
    next()
}

module.exports = logger