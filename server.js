var express = require("express")
var logger = require("./logger.js")

var app = express()
var port = 3001

app.use(logger)

app.use(express.static("public"))

app.listen(port, function() {
    console.log("== Server is listening on port: ", port)
})
