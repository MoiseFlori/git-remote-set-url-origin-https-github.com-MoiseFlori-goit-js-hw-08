const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

let intervalId = null;



function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}


function changeBodyBackgroundColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}

function startColorChange() {
  intervalId = setInterval(changeBodyBackgroundColor, 1000);
  startButton.disabled = true;
}

function endColorChange() {
  clearInterval(intervalId);
  startButton.disabled = false;
}

startButton.addEventListener('click', startColorChange);
stopButton.addEventListener('click', endColorChange);
