var drawingSearch = document.getElementById("navbar-search-input");
var drawingSearchButton = document.getElementById("navbar-search-button")
var playButton = document.querySelector('.play-button')
drawingSearchButton.addEventListener('click', search);
drawingSearch.addEventListener('keyup', search);
playButton.addEventListener('click', function () {
    var hiddenThings = document.querySelector('.hidden')
    hiddenThings.classList.toggle('hidden')
    startTimer();
    getTopic();
})

var color = "red"
var colorButtons = document.querySelectorAll('.color')


function search(event) {
	var drawings = document.getElementsByClassName('card white');
	for (i = 0; i < 3; i++) {
		if ((drawings[i].childNodes[1].childNodes[0].textContent.toUpperCase().includes(drawingSearch.value.toUpperCase())) || (drawings[i].childNodes[3].childNodes[0].textContent.toUpperCase().includes(drawingSearch.value.toUpperCase()))) {
			drawings[i].classList.remove('hidden');
			continue;
		}
		else {
			drawings[i].classList.add('hidden');
		}
	}


}

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