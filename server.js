var path = require("path")
var express = require("express")
var exphbs = require('express-handlebars')
var fs = require('fs')

var drawingData = require('./drawingData.json')

var recentData = []
function updateRecent() {
    for (var i = 0; i < 5; i++) {
        recentData.push(drawingData[drawingData.length-1-i])
    }
}
updateRecent()

var app = express()
var port = 8000

app.use(express.static("public"))
app.use(express.json())

app.engine("handlebars", exphbs({
    defaultLayout: "menuBar",
    layoutDir: path.join(__dirname, "views/layouts")
}))

app.set("view engine", "handlebars")

app.post("/home", function (req, res, next) {
})

app.get(["/", "/home"], function (req, res, next) {
    res.status(200).render("home", {
        title: "Home",
        css: "style",
        js: "index",
        card: recentData
    })
})

app.get("/gallery", function (req, res, next) {
    res.status(200).render("gallery", {
        title: "Gallery",
        css: "style",
        card: drawingData
    })
})

app.get("/howToPlay", function (req, res, next) {
    res.status(200).render("howToPlay", {
        title: "How to Play",
        css: "style"
    })
})

app.get("*", function (req, res, next) {
    res.status(200).render("404", {
        title: "404 Error",
        css: "style"
    })
})

app.listen(port, function () {
    console.log("== Server is listening on port: ", port)
})