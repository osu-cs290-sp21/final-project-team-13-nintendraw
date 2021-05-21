// canvas saving

// open save menu
var saveButton = document.querySelector(".save-button")
console.log(saveButton)

saveButton.addEventListener('click', function() {
    var saveMenu = document.querySelector(".save-menu-container")
    saveMenu.classList.toggle("hidden")
})
