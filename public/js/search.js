var drawingSearch = document.getElementById("navbar-search-input");
var drawingSearchButton = document.getElementById("navbar-search-button")
drawingSearchButton.addEventListener('click', search);
drawingSearch.addEventListener('keyup', search);
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
