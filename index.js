function clearSelection() {
    const clearButton = document.querySelector('.b-btn__clear');
    const b_roller__selection = document.querySelector('.b-roller__selection');
    clearButton.addEventListener('click', function () {
        b_roller__selection.innerHTML = '';
    });
}

// This querySelector gets a list of all span (dice) inside b-roller__selection. It will be used later in function eventListeners.
const selectorDice = document.querySelectorAll('.b-roller__selector>span');

function addToSelection(dieClass) {
    // This function adds clicked die to b-roller__selection and adds its class to the new die so they both have the same styles.
    const selectedDie = document.createElement('span');
    const b_roller__selection = document.querySelector('.b-roller__selection');
    b_roller__selection.appendChild(selectedDie);
    selectedDie.classList.add(dieClass);
    // Event listeners in this function will apply to all dice created in b-roller__selection:
    // Remove selected dice:
    selectedDie.addEventListener('contextmenu', function (event) {
        event.preventDefault();
        this.remove();
    })
    // Change dice color on click/tap:
    selectedDie.addEventListener('click', function () {
        const colorClasses = selectedDie.getAttribute('class');
        if (!colorClasses.includes('b-roller--color')) {
            selectedDie.classList.add('b-roller--color-1');
        } else if (colorClasses.includes('b-roller--color-1')) {
            selectedDie.classList.remove('b-roller--color-1');
            selectedDie.classList.add('b-roller--color-2');
        } else if (colorClasses.includes('b-roller--color-2')) {
            selectedDie.classList.remove('b-roller--color-2');
            selectedDie.classList.add('b-roller--color-3');
        } else if (colorClasses.includes('b-roller--color-3')) {
            selectedDie.classList.remove('b-roller--color-3');
            selectedDie.classList.add('b-roller--color-4');
        } else {
            selectedDie.classList.remove('b-roller--color-4');
        }
    })
}

function eventListeners() {
    selectorDice.forEach(function (dieInList) {
        // This forEach applies function addToSelection to every die so they perform in the same way.
        dieInList.addEventListener('click', function () {
            addToSelection(dieInList.getAttribute('class'));
            // This getAttribute gets each die's class (__d4, __d6, etc.) so they can be used (and applied) in function addToSelection.
        });
    })
}

function init() {
    eventListeners();
    clearSelection();
}

window.onload = function () {
    init();
}