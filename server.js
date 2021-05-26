var express = require("express")
var logger = require("./logger.js")
var exphbs = require('express-handlebars')

var app = express()
var port = 3001

app.use(logger)

app.use(express.static("public"))

// app.get("/home", function(req, res, next) {
//     res.status(200).render("drawHome")
// })

app.listen(port, function() {
    console.log("== Server is listening on port: ", port)
})
