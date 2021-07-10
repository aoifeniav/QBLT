function getRandomNumber(min, max) {
    return Math.floor(
        Math.random() * (max - min + 1) + min
    )
}

function sumNumberList(numberList) {
    let sumTotal = 0;
    for (let i = 0; i < numberList.length; i++) {
        sumTotal += numberList[i];
    }
    return sumTotal;
}

function rollDice() {
    if (document.querySelector('.b-your-roll')) {
        document.querySelector('.b-your-roll').remove();
    }

    const b_roller__selection = document.querySelector('.b-roller__selection');
    const selectedDice = document.querySelectorAll('.b-roller__selection>span');
    if (selectedDice.length <= 0) {
        b_roller__selection.classList.add('b-roller__selection--flash');
        setTimeout(function () {
            b_roller__selection.classList.remove('b-roller__selection--flash');
        }, 1000);
    } else {
        const main_section = document.querySelector('main');
        const b_your_roll = document.createElement('div');
        b_your_roll.classList.add('b-your-roll');
        main_section.appendChild(b_your_roll);

        const rolledDiceRow = document.createElement('div');
        rolledDiceRow.classList.add('d-flex', 'justify-content-center', 'flex-wrap');
        b_your_roll.appendChild(rolledDiceRow);

        const rolledNumbers = [];
        selectedDice.forEach(function (rolledDieInList) {
            const rolledDieContainer = document.createElement('div');
            rolledDieContainer.classList.add('d-flex', 'flex-column', 'align-items-center');
            rolledDiceRow.appendChild(rolledDieContainer);
            const rolledDieInListClasses = rolledDieInList.getAttribute('class');
            let dieValor;
            if (rolledDieInListClasses.includes('d4')) {
                dieValor = getRandomNumber(1, 4);
                rolledNumbers.push(dieValor);
            } else if (rolledDieInListClasses.includes('d6')) {
                dieValor = getRandomNumber(1, 6);
                rolledNumbers.push(dieValor);
            } else if (rolledDieInListClasses.includes('d8')) {
                dieValor = getRandomNumber(1, 8);
                rolledNumbers.push(dieValor);
            } else if (rolledDieInListClasses.includes('d10')) {
                dieValor = getRandomNumber(1, 10);
                rolledNumbers.push(dieValor);
            } else if (rolledDieInListClasses.includes('d12')) {
                dieValor = getRandomNumber(1, 12);
                rolledNumbers.push(dieValor);
            } else if (rolledDieInListClasses.includes('d20')) {
                dieValor = getRandomNumber(1, 20);
                rolledNumbers.push(dieValor);
            }
            const rolledDieIcon = document.createElement('span');
            rolledDieIcon.setAttribute('class', rolledDieInList.classList);
            rolledDieIcon.classList.add('b-dice--small', 'b-dice--rotate');
            rolledDieContainer.appendChild(rolledDieIcon);
            const rolledDieValor = document.createElement('span');
            rolledDieValor.classList.add('b-your-roll__result');
            rolledDieValor.innerHTML = dieValor;
            rolledDieContainer.appendChild(rolledDieValor);
        });
        const rolledTotalSum = document.createElement('div');
        rolledTotalSum.classList.add('b-your-roll__total');
        b_your_roll.appendChild(rolledTotalSum);
        rolledTotalSum.innerText = 'Total: ' + sumNumberList(rolledNumbers);
    }
}

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

function addDieToSelection(dieClass) {
    const selectedDie = document.createElement('span');
    const b_roller__selection = document.querySelector('.b-roller__selection');
    b_roller__selection.appendChild(selectedDie);
    // I apply clicked die's class to the new die so they both have the same styles.
    selectedDie.classList.add(dieClass);

    // Event listeners applied to new dice must be inside this function because new dice don't exist yet in index.html.
    selectedDie.addEventListener('contextmenu', function (event) {
        event.preventDefault();
        removeDieFromSelection(selectedDie);
    });
    selectedDie.addEventListener('click', function () {
        toggleColor(selectedDie);
    });
}

function clearDiceSelection() {
    const b_roller__selection = document.querySelector('.b-roller__selection');
    b_roller__selection.innerHTML = '';
}

/**  
 * Adds the posibility to use addDieToSelection function to every die thanks to forEach.
 */
function selectorDieListener() {
    const selectorDice = document.querySelectorAll('.b-roller__selector>span');
    selectorDice.forEach(function (dieInList) {
        dieInList.addEventListener('click', function () {
            // This getAttribute gets each die's class (__d4, __d6, etc.) so they can be applied to newly created dice in addDieToSelection function.
            addDieToSelection(dieInList.getAttribute('class'));
        });
    })
}

function rollButtonListener() {
    const rollButton = document.querySelector('.b-btn__roll');
    rollButton.addEventListener('click', function () {
        rollDice();
    });
}

function clearButtonListener() {
    const clearButton = document.querySelector('.b-btn__clear');
    clearButton.addEventListener('click', function () {
        clearDiceSelection();
    });
}

function eventListeners() {
    selectorDieListener();
    rollButtonListener();
    clearButtonListener();
}

function init() {
    eventListeners();
    getRandomNumber();
}

window.onload = function () {
    init();
}