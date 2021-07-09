// This querySelector gets a list of all span (dice) inside b-roller__selection. This will be used later in function eventListeners.
var selectorDice = document.querySelectorAll(".b-roller__selector>span");

function addToSelection(dieClass) {
    // This function adds clicked die to b-roller__selection and adds its class to the new die so they both have the same styles.
    var selectedDie = document.createElement('span');
    var b_roller__selection = document.querySelector('.b-roller__selection');
    b_roller__selection.appendChild(selectedDie);
    selectedDie.classList.add(dieClass);
    // Event listeners in this function will apply to all dice created in b-roller__selection:
    selectedDie.addEventListener('contextmenu', function(event) {
        event.preventDefault();
        this.remove();
    })

}

function eventListeners() {
    selectorDice.forEach(function(dieInList) {
        // This forEach applies function addToSelection to every die so they perform in the same way.
        dieInList.addEventListener('click', function() {
            addToSelection(dieInList.getAttribute('class'));
            // This getAttribute gets each die's class (__d4, __d6, etc.) so they can be used (and applied) in function addToSelection.
        });
    })
}

function init() {
    eventListeners();
}

window.onload = function () {
    init();
}