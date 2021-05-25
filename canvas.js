var size = document.querySelector('#drawing-window').getBoundingClientRect().width

window.addEventListener('load', () => {
    const canvas = document.querySelector("#canvas") // grab the canvas
    const ctx = canvas.getContext('2d')

    // Resizing
    canvas.height = size
    canvas.width = size

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
        ctx.lineWidth = 5
        ctx.lineCap = "round"
        ctx.strokeStyle = "red"

        ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop)
    }

    canvas.addEventListener('mousedown', startPosition)
    canvas.addEventListener('mouseup', finishPosition)
    canvas.addEventListener('mousemove', draw)

})