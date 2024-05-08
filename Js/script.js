// Global variables
const suits = {0: 'spades', 1: 'hearts', 2: 'clubs', 3: 'diamonds'};
const keys = document.querySelectorAll('.key');
const rows = document.querySelectorAll('.board-row');
const cards = document.querySelectorAll('.card');
const keyCards = document.querySelectorAll('.key-card');
const title = document.querySelector('.title');

let disabledButtons = [];

let solutionType = ["Straight", "Flush", "Full House", "Four of a Kind", "Straight Flush", "Royal Flush"];
let solution = [];

// State variables
let currentSuit = 0;
let currentRow = 0;
let currentCard = 0;

window.onload = () => {
    generateSolution();
};

// Generate solution
function generateSolution() {
    // let type = solutionType[Math.floor(Math.random() * solutionType.length)];
    let type = "Full House";
    if (type == "Straight") {
        let startingValue = Math.floor(Math.random() * 9) + 2;
        for (let i = 0; i < 5; i++) {
            let newCard = {"value": startingValue + i, "suit": Math.floor(Math.random() * 4)};
            solution.push(newCard);
        }
    } else if (type == "Flush") {
        let suit = Math.floor(Math.random() * 4);
        let i = 0;
        while (i < 5) {
            let value = Math.floor(Math.random() * 13) + 2;
            let newCard = {"value": value, "suit": suit};
            if (solution.length > 0) {
                if (!(solution.some(card => card['value'] == value && card['suit'] == suit))) {
                    solution.push(newCard);
                    i++;
                }                
            } else {
                solution.push(newCard);
                i++;
            }
        }
        sortByValue(solution);
    } else if (type == "Full House") {
       let valueOne = Math.floor(Math.random() * 13) + 2;
       let i = 0;
       while (i < 3) {
           let suit = Math.floor(Math.random() * 4);
           let newCard = {"value": valueOne, "suit": suit};
           if (solution.length > 0) {
               if (!(solution.some(card => card['value'] == valueOne && card['suit'] == suit))) {
                   solution.push(newCard);
                   i++;
               }                
           } else {
               solution.push(newCard);
               i++;
           }
       }
       let valueTwo = Math.floor(Math.random() * 13) + 2; 
       while (valueTwo == valueOne) {
           valueTwo = Math.floor(Math.random() * 13) + 2;
       }
       let j = 0;
       while (j < 2) {
           let suit = Math.floor(Math.random() * 4);
           let newCard = {"value": valueTwo, "suit": suit};
           if (!(solution.some(card => card['value'] == valueTwo && card['suit'] == suit))) {
                solution.push(newCard);
                j++;
            }
       }
       sortByValue(solution);
       sortBySuit(solution);
    } else if (type == "Four of a Kind") {
        let value = Math.floor(Math.random() * 13) + 2;
        for (let i = 0; i < 4; i++) {
            let newCard = {"value": value, "suit": i};
            solution.push(newCard);
        }
        let j = 0;
        while (j < 1) {
            let value = Math.floor(Math.random() * 13) + 2;
            let suit = Math.floor(Math.random() * 4);
            let newCard = {"value": value, "suit": suit};
            if (!(solution.some(card => card['value'] == value && card['suit'] == suit))) {
                solution.push(newCard);
                j++;
            }                
        }
        sortByValue(solution);

    } else if (type == "Straight Flush") {
        let startingValue = Math.floor(Math.random() * 9) + 2;
        let suit = Math.floor(Math.random() * 4);
        for (let i = 0; i < 5; i++) {
            let newCard = {"value": startingValue + i, "suit": suit};
            solution.push(newCard);
        }
    } else {
        let startingValue = 10;
        let suit = Math.floor(Math.random() * 4);
        for (let i = 0; i < 5; i++) {
            let newCard = {"value": startingValue + i, "suit": suit};
            solution.push(newCard);
        }
    }
}

// Sort cards by value least to greatest
function sortByValue(arr) {
    for (let i = 1; i < arr.length; i++) {
        let j = i;
        while(j > 0 && (arr[j]['value'] < arr[j-1]['value'])) {
            let temp = arr[j];
            arr[j] = arr[j-1];
            arr[j-1] = temp;
            j--;
        }
    }
}

// Sort cards by suit (spades, hearts, clubs, diamonds
function sortBySuit(arr) {
    for (let i = 1; i < arr.length; i++) {
        let j = i;
        while(j > 0 && ((arr[j]['value'] == arr[j-1]['value']) && (arr[j]['suit'] < arr[j-1]['suit']))) {
            let temp = arr[j];
            arr[j] = arr[j-1];
            arr[j-1] = temp;
            j--;
        }
    }
}

// Submit row
function submitRow() {
    if (currentCard == 5) {
        checkRow();
        if (currentRow < 5) {
            currentCard = 0;
            currentRow++;
        }
        updateDisabledButtons();
    } else {
        rows[currentRow].style.animation = "shake 0.2s ease-out forwards";
        setTimeout(() => {
            rows[currentRow].style.animation = "none";
        }, 200);
    }
}

// Check row
function checkRow() {
    let correct = [];
    let almost = []
    let incorrect = [];
    let row = generateRowData();
    for (let i = 0; i < row.length; i++) {
        let correctCard = false;
        for (let j = 0; j < solution.length; j++) {
            if (row[i]['value'] == solution[j]['value'] && row[i]['suit'] == solution[j]['suit']) {
                if (i == j) {
                    correct.push(i);
                } else {
                    almost.push(i);
                }
                correctCard = true;
                disabledButtons.splice(disabledButtons.findIndex(value => value === numberToLetter(row[i]['value']) + ":" + suits[row[i]['suit']]), 1);
            }        
        }
        if (!correctCard) {
            incorrect.push(i);
        }
    }
    updateRowStatus(correct, almost, incorrect);
}

// Turn row into object of values and suits
function generateRowData() {
    let row = [];
    for (let i = 0; i < rows[currentRow].children.length; i++) {
        let content = rows[currentRow].children[i].children[0];
        let topText = content.children[0];
        let img = content.children[1];
        let value = topText.textContent;
        if (value == 'J') value = 11;
        if (value == 'Q') value = 12;
        if (value == 'K') value = 13;
        if (value == 'A') value = 14;
        let suit = Object.keys(suits).find(key => suits[key] === img.alt);
        row.push({"value": value, "suit": suit});
    }
    return row;
}

// Change color of cards depending on status
function updateRowStatus(correct, almost, incorrect) {
    for (let i = 0; i < correct.length; i++) {
        rows[currentRow].children[correct[i]].style.backgroundColor = 'var(--correct-green)';
    }
    for (let i = 0; i < almost.length; i++) {
        rows[currentRow].children[almost[i]].style.backgroundColor = 'var(--almost-yellow)';
    }
    for (let i = 0; i < incorrect.length; i++) {
        rows[currentRow].children[incorrect[i]].style.backgroundColor = 'var(--incorrect-grey)';
    }

}

// Change suit given user input on button
function changeSuit(suit) {
    if (suit != currentSuit) {
        currentSuit = suit;        
    }
    updateKeyCards();
}

// Update key cards based on suit
function updateKeyCards() {
    keyCards.forEach((card) => {
        let topText = card.children[0];
        let img = card.children[1];
        let bottomText = card.children[2];
        img.src = `/Assets/${suits[currentSuit]}.svg`;
        img.alt = `${suits[currentSuit]}`;
        updateTextColor(topText, bottomText);
    });
    updateDisabledButtons();
}

// Place card on first empty spot on board
function placeCard(button, value) {
    if (isAvailable()) {
        updateBoard(button, value);
    }
}

// Update board with new card
function updateBoard(button, value) {
    let nextCard = rows[currentRow].children[currentCard] // Next card at current row and current Card
    let content = nextCard.children[0].children;
    let topText = content[0];
    let img = content[1];
    let bottomText = content[2];
    let success = updateCardContents(topText, img, bottomText, value); // Determines if placing card was successful
    if (success) {
        updateCardStyle();
        disabledButtons.push(value + ":" + button.children[0].children[1].alt)
        updateDisabledButtons();
        currentCard++; 
    }
}

// Updates the contents of passed in HTML elements
function updateCardContents(topText, img, bottomText, value) {
    if (!cardExistsPerRow(value)) {
        topText.textContent = value;
        img.src = `/Assets/${suits[currentSuit]}.svg`;
        img.alt = `${suits[currentSuit]}`;
        bottomText.textContent = value;
        updateTextColor(topText, bottomText);
    } else {
        return false;
    }
    return true;
}

// Returns true if card of same suit and number exists on board
function cardExistsPerRow(value) {
    let count = 0;
    for (let i = 0; i < rows[currentRow].children.length; i++) {
        let content = rows[currentRow].children[i].children[0].children;
        let topText = content[0];
        let img = content[1];
        if ((topText.textContent == value) && (img.alt == suits[currentSuit])) {
            count++;
        }
    }
    if (count > 0) {
        return true;
    }
    return false;    
}

// Returns true if there is an available spot on the current row to add another card
function isAvailable() {
    if (currentCard > 4) {
        return false;
    }
    return true;
}

// Animate card and change border color to reflect added card
function updateCardStyle() {
    rows[currentRow].children[currentCard].children[0].classList.remove('hidden');
    rows[currentRow].children[currentCard].style.animation = 'pulse 0.1s ease forwards';
    rows[currentRow].children[currentCard].style.borderColor = 'var(--dark-grey)';
}

// Disable buttons that have already been used in the current row
function updateDisabledButtons() {
    keyCards.forEach((card) => {
        card.parentElement.disabled = false;
    });
    keyCards.forEach((card) => {
        let value = card.children[0];
        let suit = card.children[1].alt;
        if (disabledButtons.includes(value.textContent.toString() + ":" + suit)) {
            card.parentElement.disabled = true;
        }
    });
}

function backspace() {
    let backspaceCard = currentCard - 1;
    if (backspaceCard >= 0) {
        let card = rows[currentRow].children[backspaceCard];
        let content = card.children[0];
        let topText = content.children[0];
        let img = content.children[1];
        let bottomText = content.children[2];
        let value = topText.textContent;
        let suit = img.alt;
        topText.textContent = '';
        img.src = '';
        img.alt = '';
        bottomText.textContent = '';
        disabledButtons.splice(disabledButtons.indexOf(value + ":" + suit), 1);
        updateDisabledButtons();
        card.style.animation = 'none';
        card.style.borderColor = 'var(--light-grey)';
        content.classList.add('hidden');
        currentCard--;
    }

}

// Changes the color of passed HTML elements to reflect card suit
function updateTextColor(topText, bottomText) {
    if (currentSuit == 1 || currentSuit == 3) {
        topText.classList.add('red');
        topText.classList.remove('black');
        bottomText.classList.add('red');
        bottomText.classList.remove('black');
    } else {
        topText.classList.add('black');
        topText.classList.remove('red');
        bottomText.classList.add('black');
        bottomText.classList.remove('red');
    }
}

// Takes a number of card and returns the number or letter representation
function numberToLetter(cardNum) {
    if (cardNum == 11) {
        return 'J';
    } else if (cardNum == 12) {
        return 'Q';
    } else if (cardNum == 13) {
        return 'K';
    } else if (cardNum == 14) {
        return 'A';
    } else {
        return cardNum.toString();
    }
}