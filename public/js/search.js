var galSearch = document.querySelector('.gallery-search-input')
var galSearchButton = document.querySelector('.gallery-search-button')
galSearchButton.addEventListener('click', search2)
function search2(event) {
    var drawinginfo = document.getElementsByClassName('drawing-info');
    var cardw = document.getElementsByClassName('card white');
    for (i = 0; i < cardw.length; i++) {
        if ((drawinginfo[i].childNodes[1].textContent.toUpperCase().includes(galSearch.value.toUpperCase())) || (drawinginfo[i].childNodes[3].textContent.toUpperCase().includes(galSearch.value.toUpperCase()))) {
            cardw[i].classList.remove('hidden');
            continue;
        }
        else {
            cardw[i].classList.add('hidden');
        }
    }
}
