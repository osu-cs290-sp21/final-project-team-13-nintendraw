var playButton = document.querySelector('.play-button')

playButton.addEventListener('click', function () {
    var hiddenThings = document.querySelector('.hidden')
    hiddenThings.classList.toggle('hidden')
    startTimer();
    getTopic();
})

var color = "red"
// ==
var colorButtons = document.querySelectorAll('.color')

function toggleSelectedAll () {
    for (var i = 0; i < colorButtons.length; i++) {
        colorButtons[i].classList.remove('selected')
    }
}

function colorSelect(event) {
    color = getComputedStyle(event.currentTarget).getPropertyValue('background-color')
    toggleSelectedAll()
    event.currentTarget.classList.add('selected')
}

for (var i = 0; i < colorButtons.length; i++) {
    for (var i = 0; i < colorButtons.length; i++) {
        colorButtons[i].addEventListener('click', colorSelect)
    }
}

// ==

window.addEventListener('load', () => {
    const canvas = document.querySelector("#canvas") // grab the canvas
    const ctx = canvas.getContext('2d')

    // Resizing
    canvas.height = 400
    canvas.width = 400

    let painting = false

    function startPosition(e) {
        painting = true
        draw(e)
    }

    function finishPosition() {
        painting = false
        ctx.beginPath()
    }

    function draw(e) {
        if (!painting) {
            return
        }
        ctx.lineWidth = 8
        ctx.lineCap = "round"
        ctx.strokeStyle = color

        ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop)
    }

    canvas.addEventListener('mousedown', startPosition)
    canvas.addEventListener('mouseup', finishPosition)
    canvas.addEventListener('mousemove', draw)
    canvas.addEventListener('mouseout', function () {
        painting = false
        ctx.beginPath()
    })
})

function clear() {
    const canvas = document.querySelector("#canvas") // grab the canvas
    const ctx = canvas.getContext('2d')

    ctx.clearRect(0,0, canvas.width, canvas.height)
}

var clearButton = document.querySelector('.clear')
clearButton.addEventListener('click', clear)

var closeButton = document.querySelector('.close')
closeButton.addEventListener('click', function () {
    clear()
    var hiddenThings = document.querySelector('.drawing-window-container')
    hiddenThings.classList.add('hidden')
    toggleSelectedAll()
    color = 'red'
    var red = document.querySelector('.red')
    red.classList.add('selected')
    time = 5;
})

function saveCanvas () {
    var canvas = document.querySelector('#canvas')
    if (window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(canvas.msToBlob(), 'canvas-image.png')
    } else {
        const a = document.createElement('a')
        document.body.appendChild(a)
        a.href = canvas.toDataURL()
        a.download = 'canvas-image.png'
        a.click()
        document.body.removeChild(a)
    }
}


//-------------------
// Timer Function
//-------------------
 var time = 5;
function startTimer(){

    console.log("Started Timer");
    var clock=setInterval(function(){
        document.getElementById("timer").innerHTML=''+time;
        time--
        if(time == 0){
            clearInterval(clock);
            saveCanvas();
        }// }else{
        //     clearTimeout(time);
        //     console.log('timer quit');
        //     return
        // }

     },1000);
}

//------------------
// Topic Selection
//-------------------

function getTopic(){var dino = ["Trex","Triceratops","Velocoraptor"];
var pokemon = ["Pikachu","Charmander","Rowlett"];
var topics = [dino,pokemon];
//var btn = document.getElementById("draw-topic");
var min = Math.ceil(0);
var max = Math.floor(2);
var timer = document.getElementById("draw-topic");
var tp = (Math.floor(Math.random()*(max-min)+min));
console.log(tp);
console.log(topics[tp])
//var whichTopic = topics[tp];
var topicLenght = topics[tp].length;

var newMax = Math.floor(topicLenght);

var draw = (Math.floor(Math.random()*(newMax-min)+min))
console.log(draw)

var time = topics[tp][draw];
console.log(time)
timer.innerHTML='Draw:'+time;
}


//-------------
// Saveing
//-------------
// canvas saving

// open save menu
// var saveButton = document.querySelector(".save-button")
// console.log(saveButton)
//
// var cancelButton = document.getElementById("cancel")
// var confirmButton = document.getElementById("confirm")
//
// var saveBack = document.getElementById("save-backdrop")
// var saveMenu = document.getElementById("save-menu-container")
// var saveItems = document.getElementById("save-menu-items")
//
// var titleName = document.getElementById("title-input")
// var authorName = document.getElementById("author-input")
// var canvas = document.getElementById("canvas")
//
// saveButton.addEventListener('click', function() {
//     // open save menu
//     saveMenu.className = "visible"
//     saveBack.className = "visible"
//     saveItems.className = "visible"
// })
//
// cancelButton.addEventListener("click", function() {
//     // close and clear save menu
//     closeSaveMenu()
// })
//
// confirmButton.addEventListener("click", function() {
//     // close, clear, and save the canvas/save menu
//     if (titleName.value === "" && authorName.value === "") {
//         alert("Both the author and title are empty.")
//     }
//     else if (titleName.value === "") {
//         alert("The title is empty.")
//     }
//     else if(authorName.value === "") {
//         alert("The author is empty.")
//     }
//     else {
//         saveCanvas()
//         closeSaveMenu()
//     }
// })
//
// function saveCanvas() {
//     // save the canvas with the appropriate meta data
//     var drawing = canvas.toDataURL() // see saveCanvas() functio below
//     var title = String(titleName.value)
//     var author = String(authorName.value)
// }
//
// function closeSaveMenu() {
//     // clear and close save menu
//     saveMenu.className = "hidden"
//     saveBack.className = "hidden"
//     saveItems.className = "hidden"
//
//     titleName.value = ""
//     authorName.value = ""
// }
//
// // you may want to use this function for compatability across different browsers
// function saveCanvas () {
//     var canvas = document.querySelector('#canvas')
//     if (window.navigator.msSaveBlob) {
//         window.navigator.msSaveBlob(canvas.msToBlob(), 'canvas-image.png')
//     } else {
//         const a = document.createElement('a')
//         document.body.appendChild(a)
//         a.href = canvas.toDataURL()
//         a.download = 'canvas-image.png'
//         a.click()
//         document.body.removeChild(a)
//     }
// }
