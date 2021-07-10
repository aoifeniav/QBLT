function removeDieFromSelection(dieToRemove) {
    dieToRemove.remove();
}

function toggleColor(dieToToggle) {
    const colorClasses = dieToToggle.getAttribute('class');
    if (!colorClasses.includes('b-dice--color')) {
        dieToToggle.classList.add('b-dice--color-1');
    } else if (colorClasses.includes('b-dice--color-1')) {
        dieToToggle.classList.remove('b-dice--color-1');
        dieToToggle.classList.add('b-dice--color-2');
    } else if (colorClasses.includes('b-dice--color-2')) {
        dieToToggle.classList.remove('b-dice--color-2');
        dieToToggle.classList.add('b-dice--color-3');
    } else if (colorClasses.includes('b-dice--color-3')) {
        dieToToggle.classList.remove('b-dice--color-3');
        dieToToggle.classList.add('b-dice--color-4');
    } else {
        dieToToggle.classList.remove('b-dice--color-4');
    }
}

/** This function adds clicked die to selection and applies its class to the new die so they both have the same styles.
*/
function addToSelection(dieClass) {
    const selectedDie = document.createElement('span');
    const b_roller__selection = document.querySelector('.b-roller__selection');
    b_roller__selection.appendChild(selectedDie);
    selectedDie.classList.add(dieClass);

    // Event listeners applied to newly created dice must be inside this function because they don't exist yet in index.html.
    // Remove selected die:
    selectedDie.addEventListener('contextmenu', function (event) {
        event.preventDefault();
        removeDieFromSelection(selectedDie);
    });
    // Change dice color on click/tap on selected die:
    selectedDie.addEventListener('click', function () {
        toggleColor(selectedDie);
    });
}

/**  This function clears all selected dice.
*/
function clearSelection() {
    const b_roller__selection = document.querySelector('.b-roller__selection');
    b_roller__selection.innerHTML = '';
}

/**  This function adds the posibility to use addToSelection function to every die thanks to forEach.
 */
function selectorDieListener() {
    // This querySelector gets a list of all dice (span) inside selection.
    const selectorDice = document.querySelectorAll('.b-roller__selector>span');
    selectorDice.forEach(function (dieInList) {
        dieInList.addEventListener('click', function () {
            // This getAttribute gets each die's class (__d4, __d6, etc.) so they can be applied to newly created dice in addToSelection function.
            addToSelection(dieInList.getAttribute('class'));
        });
    })
}

/**  This function uses rollDice function when clicking Roll button.
*/
function rollButtonListener() {
    const rollButton = document.querySelector('.b-btn__roll');
    rollButton.addEventListener('click', function () {
        rollDice();
    });
}

/** This function uses clearSelection function when clicking Clear button.
 */
function clearButtonListener() {
    const clearButton = document.querySelector('.b-btn__clear');
    clearButton.addEventListener('click', function () {
        clearSelection();
    });
}

function eventListeners() {
    selectorDieListener();
    rollButtonListener();
    clearButtonListener();
}

function init() {
    eventListeners();
}

window.onload = function () {
    init();
}