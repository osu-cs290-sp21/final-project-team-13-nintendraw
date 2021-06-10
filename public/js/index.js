// canvas saving

// open save menu
var saveButton = document.querySelector(".save-button")
var canDraw = false

var cancelButton = document.getElementById("cancel")
var confirmButton = document.getElementById("confirm")

var saveBack = document.getElementById("save-backdrop")
var saveMenu = document.getElementById("save-menu-container")
var saveItems = document.getElementById("save-menu-items")

var authorName = document.getElementById("author-input")
var canvas = document.getElementById("canvas")

var drawinginfoearch = document.getElementById("navbar-search-input");
var drawinginfoearchButton = document.getElementById("navbar-search-button")
drawinginfoearchButton.addEventListener('click', search);
//drawinginfoearch.addEventListener('keyup', search);
function search(event) {
	var drawinginfo = document.getElementsByClassName('drawing-info');
	var cardw = document.getElementsByClassName('card white');
	for (i = 0; i < 8; i++) {

		if ((drawinginfo[i].childNodes[1].textContent.toUpperCase().includes(drawinginfoearch.value.toUpperCase())) || (drawinginfo[i].childNodes[3].textContent.toUpperCase().includes(drawinginfoearch.value.toUpperCase()))) {
			cardw[i].classList.remove('hidden');
			continue;
		}
		else {
			cardw[i].classList.add('hidden');
		}
	}


}
saveButton.addEventListener('click', function () {
    // open save menu
    saveMenu.classList.toggle("hidden")
    saveBack.classList.toggle("hidden")
    saveItems.classList.toggle("hidden")
})

function openSaveMenu() {
    // open save menu
    saveMenu.classList.toggle("hidden")
    saveBack.classList.toggle("hidden")
    saveItems.classList.toggle("hidden")
}

cancelButton.addEventListener("click", function () {
    // close and clear save menu
    closeSaveMenu()
})

confirmButton.addEventListener("click", function () {
    // close, clear, and save the canvas/save menu
    if (authorName.value === "") {
        alert("Please enter an author name.")
    }
    else {
        var authorr
        var title = document.querySelector(".topic")
        title.innerHTML.substr(6, title.innerHTML.length - 1)
        var req = new XMLHttpRequest()
        var reqUrl = "/home/addDrawing"
        req.open('POST', reqUrl)
        authorr = authorName.value
        var newDrawing = {
            title: title.innerHTML.substr(6, title.innerHTML.length - 1),
            author: authorName.value,
            drawing: canvas.toDataURL()
        }
        var reqBody = JSON.stringify(newDrawing)


        req.setRequestHeader('Content-Type', 'application/json')
        req.send(reqBody)

        closeSaveMenu()

        var hiddenThings = document.querySelector('.drawing-window-container')
        hiddenThings.classList.add('hidden')
        toggleSelectedAll()
        color = 'red'
        var red = document.querySelector('.red')
        red.classList.add('selected')
        timeLeft = 30
        clearInterval(timerId)
        // saveButton.classList.toggle("hidden")
        var cardContainer = document.querySelector('.card-container')
        var card = document.createElement('div')
        card.classList.add('card')
        card.classList.add('white')
        card.innerHTML = '<img src="' + canvas.toDataURL() + '" class="drawing-drawing">' +
                         '<p class="drawing-title">'+ title.innerHTML.substr(6, title.innerHTML.length - 1) +'</p>' +
                         '<p class="drawing-author">by '+ authorr +'</p>'
        cardContainer.prepend(card)
        cardContainer.removeChild(cardContainer.lastChild)
    }
})

function closeSaveMenu() {
    // clear and close save menu
    saveMenu.classList.add("hidden")
    saveBack.classList.add("hidden")
    saveItems.classList.add("hidden")
    authorName.value = ""
}

// you may want to use this function for compatability across different browsers
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

/////////////////////////////////////////////////////////////

var timer = document.querySelector('.timer')
var timeLeft = 30
var timerId

var drawinginfoearch = document.getElementById("navbar-search-input");
var drawinginfoearchButton = document.getElementById("navbar-search-button")
var playButton = document.querySelector('.play-button')



playButton.addEventListener('click', function () {
    var hiddenThings = document.querySelector('.hidden')
    hiddenThings.classList.toggle('hidden')
    timerId = setInterval(countdown, 1000)
    countdown()
    getTopic()
    canDraw = true
})

var color = "red"
var colorButtons = document.querySelectorAll('.color')




function toggleSelectedAll() {
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


window.addEventListener('load', () => {
    const canvas = document.querySelector("#canvas") // grab the canvas
    const ctx = canvas.getContext('2d')

    // Resizing
    canvas.height = 400
    canvas.width = 400

    let painting = false

    function startPosition(e) {
        if (canDraw) { painting = true }
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

        ctx.lineTo(e.clientX - canvas.offsetLeft - 25 , e.clientY - canvas.offsetTop - 25 )
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(e.clientX - canvas.offsetLeft - 25, e.clientY - canvas.offsetTop - 25)
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

    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

var clearButton = document.querySelector('.clear')
clearButton.addEventListener('click', function() {
    if (canDraw) {
        clear()
    }
})

var yes = document.getElementById("yes")
var no = document.getElementById("no")
var promptContainer = document.getElementById("confirm-menu-container")
var promptItems = document.getElementById("confirm-menu-items")
var promptBackground = document.getElementById("confirm-backdrop")

var closeButton = document.querySelector('.close')
closeButton.addEventListener('click', function () {
    var hiddenThings = document.querySelector('.drawing-window-container')
    // hiddenThings.classList.add('hidden')
    toggleSelectedAll()
    color = 'red'
    var red = document.querySelector('.red')
    red.classList.add('selected')
    // timeLeft = 30
    // clearInterval(timerId)
    // clear()

    promptContainer.classList.toggle("hidden")
    promptItems.classList.toggle("hidden")
    promptBackground.classList.toggle("hidden")
    // saveButton.classList.toggle("hidden")
})

yes.addEventListener("click", function() {
    var hiddenThings = document.querySelector('.drawing-window-container')
    hiddenThings.classList.add('hidden')
    clear()
    promptContainer.classList.toggle("hidden")
    promptItems.classList.toggle("hidden")
    promptBackground.classList.toggle("hidden")
    timeLeft = 30
    clearInterval(timerId)
})

no.addEventListener("click", function() {
    promptContainer.classList.toggle("hidden")
    promptItems.classList.toggle("hidden")
    promptBackground.classList.toggle("hidden")
})

function countdown() {
    if (timeLeft == -1) {
        clearTimeout(timerId)
        canDraw = false
        // saveButton.classList.toggle("hidden")
        openSaveMenu()
    } else {
        timer.innerHTML = timeLeft
        timeLeft--
        console.log(timeLeft)
    }
}

function getTopic() {
    pokemon = ['Pikachu', 'Charmander', 'Rowlett', 'Mudkip', 'Squirtle','Bublbasaur','Litten','Chimchar'];
    smash = ['Capt Falcon','Donky Kong',' Metaknight','Kirby','Mega Man','Cloud','Olimar','Dr. Mario','Game n Watch','King Dedede','Samus'];
    mario = ['Mario','Peach','Capt Toad','Luigi','Yoshi','Bowser','Bower Jr','Goomba','Koopa','Wario','Waluigi'];
    zelda = ['Link','Ganondorf','Zelda','Sheik','Chu','Midna','Tri-force','Master Sword','Hylian Sheild'];
    sonic = ['Sonic','Knuckles','Tails','Shadow','Dr. Eggman'];
    consoles = ['Wii','Switch','Famicom','NES','SNES','Nintendo 64','Wii U','Gameboy','Gameboy Advanced','DS','3DS','Game Cube','Virtual Boy','Game n Watch Handheld'];
    misc = ['Tom Nook', 'Isabell', 'Rob'];
    var topics = [pokemon,smash,zelda,sonic,consoles,misc];
    //var btn = document.getElementById("draw-topic");
    var min = Math.ceil(0);
    var max = Math.floor(topics.length-1);
    var timer = document.getElementById("draw-topic");
    var tp = (Math.floor(Math.random() * (max - min) + min));
    //var whichTopic = topics[tp];
    var topicLenght = topics[tp].length;

    var newMax = Math.floor(topicLenght);

    var draw = (Math.floor(Math.random() * (newMax - min) + min))

    var time = topics[tp][draw];
    console.log("the topic is:", time)
    var topicHtml = document.querySelector('.topic')
    topicHtml.innerHTML = "Draw: " + time
}
