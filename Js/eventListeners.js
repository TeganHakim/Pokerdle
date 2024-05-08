const overlay = document.getElementById('overlay');

const helpButton = document.getElementById('helpButton');
const helpCloseButton = document.getElementById('helpExit');
const helpMenu = document.getElementById('helpMenu');

const settingsButton = document.getElementById('settingsButton');
const settingsCloseButton = document.getElementById('settingsExit');
const settingsMenu = document.getElementById('settingsMenu');

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
});

// Board
document.onkeydown = (key) => {
    if (key.key === "Backspace") {
        backspace();
    } else if (key.key === "Enter") {
        submitRow();
    }
}