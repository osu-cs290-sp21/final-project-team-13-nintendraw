// canvas saving

// open save menu
var saveButton = document.querySelector(".save-button")
console.log(saveButton)

var cancelButton = document.getElementById("cancel")
var confirmButton = document.getElementById("confirm")

var saveBack = document.getElementById("save-backdrop")
var saveMenu = document.getElementById("save-menu-container")
var saveItems = document.getElementById("save-menu-items")

var titleName = document.getElementById("title-input")
var authorName = document.getElementById("author-input")
var canvas = document.getElementById("canvas")

saveButton.addEventListener('click', function() {
    // open save menu
    saveMenu.className = "visible"
    saveBack.className = "visible"
    saveItems.className = "visible"
})

cancelButton.addEventListener("click", function() {
    // close and clear save menu
    closeSaveMenu()
})

confirmButton.addEventListener("click", function() {
    // close, clear, and save the canvas/save menu
    if (titleName.value === "" && authorName.value === "") {
        alert("Both the author and title are empty.")
    }
    else if (titleName.value === "") {
        alert("The title is empty.")
    }
    else if(authorName.value === "") {
        alert("The author is empty.")
    }
    else {
        saveCanvas()
        closeSaveMenu()
    }
})

function saveCanvas() {
    // save the canvas with the appropriate meta data
    var drawing = canvas.toDataURL()
    var title = String(titleName.value)
    var author = String(authorName.value)
}

function closeSaveMenu() {
    // clear and close save menu
    saveMenu.className = "hidden"
    saveBack.className = "hidden"
    saveItems.className = "hidden"

    titleName.value = ""
    authorName.value = ""
}
