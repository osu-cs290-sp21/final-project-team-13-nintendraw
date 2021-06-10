var path = require("path")
var express = require("express")
var exphbs = require('express-handlebars')
var fs = require('fs')

var drawingData = require('./drawingData.json')

var app = express()
var port = 8000

app.use(express.static("public"))
app.use(express.json())

app.engine("handlebars", exphbs({
    defaultLayout: "menuBar",
    layoutDir: path.join(__dirname, "views/layouts")
}))

app.set("view engine", "handlebars")

app.get(["/", "/home"], function (req, res, next) {
    var recentData = []
    for (var i = 0; i < 5; i++) {
        recentData[i] = drawingData[drawingData.length - 1 - i]
    }
    res.status(200).render("home", {
        title: "Home",
        css: "style",
        js: "index",
        card: recentData
    })
})

// WRITING TO JSON FILE ////////////////////////////////////////////////////////
function saveData() {
    var newData = {
        title: "Title",
        author: "author",
        drawing: "drawing"
    }
    drawingData.push(newData)
    var data = JSON.stringify(drawingData, null, 4)
    fs.writeFile('drawingData.json', data, function (err) {
        if (err) {
            console.log(err)
            return
        }
    })
}

////////////////////////////////////////////////////////////////////////////////

app.post("/home/addDrawing", function (req, res, next) {
    if (req.body && req.body.title && req.body.author && req.body.drawing) {
        res.status(200).send()

        var newData = {
            title: req.body.title,
            author: req.body.author,
            drawing: req.body.drawing
        }
        drawingData.push(newData)
        var data = JSON.stringify(drawingData, null, 4)
        fs.writeFile('drawingData.json', data, function (err) {
            if (err) {
                console.log(err)
                return
            }
        })

    } else {
        res.status(400).send("Request needs JSON body with 'title', 'author', and 'drawing'.")
    }
})

app.get("/gallery", function (req, res, next) {
    res.status(200).render("gallery", {
        title: "Gallery",
        css: "style",
		js: "search",
        card: drawingData,
    })
})

app.get("/howToPlay", function (req, res, next) {
    res.status(200).render("howToPlay", {
        title: "How to Play",
        css: "style"
    })
})

app.get("*", function (req, res, next) {
    res.status(404).render("404", {
        title: "404 Error",
        css: "style"
    })
})

app.listen(port, function () {
    console.log("== Server is listening on port: ", port)
})