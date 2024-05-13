const body = document.querySelector('body');
const overlay = document.getElementById('overlay');
const spadeImg = document.getElementById('spadeImg');
const clubImg = document.getElementById('clubImg');

const helpButton = document.getElementById('helpButton');
const helpCloseButton = document.getElementById('helpExit');
const helpMenu = document.getElementById('helpMenu');

const settingsButton = document.getElementById('settingsButton');
const settingsCloseButton = document.getElementById('settingsExit');
const settingsMenu = document.getElementById('settingsMenu');
const darkModeToggle = document.getElementById('darkMode');
let darkMode = false;

const gameOverMenu = document.getElementById('gameOverMenu')
const gameOverCloseButton = document.getElementById('gameOverExit');

// Help Menu
helpButton.addEventListener('click', () => {
    helpMenu.classList.remove('hidden');
    overlay.classList.remove('hidden');
    helpMenu.style.animation = "slide-in ease-out 200ms";
});
helpCloseButton.addEventListener('click', () => {
    helpMenu.style.animation = "slide-out ease-out 200ms";
    setTimeout(()=>{
        helpMenu.classList.add('hidden');
        overlay.classList.add('hidden');
    }, 190);
});

// Settings Menu
settingsButton.addEventListener('click', () => {
    settingsMenu.classList.remove('hidden');
    overlay.classList.remove('hidden');
    settingsMenu.style.animation = "slide-in ease-out 200ms";
});
settingsCloseButton.addEventListener('click', () => {
    settingsMenu.style.animation = "slide-out ease-out 200ms";
    setTimeout(()=>{
        settingsMenu.classList.add('hidden');
        overlay.classList.add('hidden');
    }, 190);
});

// Game Over
gameOverCloseButton.addEventListener('click', () => {
    gameOverMenu.style.animation = "slide-out ease-out 200ms";
    setTimeout(()=>{
        gameOverMenu.classList.add('hidden');
        overlay.classList.add('hidden');
    }, 190);
});

// Dark Mode
darkModeToggle.addEventListener('change', () => {
    if (darkModeToggle.checked) {
        darkMode = true;
        body.classList.add('dark-mode');
        body.classList.remove('light-mode');
        spadeImg.src = "/Assets/spadesDark.svg";
        clubImg.src = "/Assets/clubsDark.svg";
    } else {
        darkMode = false;
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        spadeImg.src = "/Assets/spades.svg";
        clubImg.src = "/Assets/clubs.svg";
    }
});

// Board
document.onkeydown = (key) => {
    if (key.key === "Backspace") {
        backspace();
    } else if (key.key === "Enter") {
        submitRow();
    }
}