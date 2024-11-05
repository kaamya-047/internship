let startTime;
let updatedTime;
let difference;
let interval;
let running = false;

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');

startButton.addEventListener('click', () => {
    if (!running) {
        running = true;
        startTime = new Date().getTime() - (difference || 0);
        interval = setInterval(updateDisplay, 10);  // Update every 10 milliseconds
    }
});

stopButton.addEventListener('click', () => {
    running = false;
    clearInterval(interval);
    difference = new Date().getTime() - startTime;
});

resetButton.addEventListener('click', () => {
    running = false;
    clearInterval(interval);
    startTime = 0;
    difference = 0;
    display.innerHTML = '00:00:00.00';
});

function updateDisplay() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 10);  // Divide by 10 for two digits

    display.innerHTML = `${pad(minutes)}:${pad(seconds)}.${padMilliseconds(milliseconds)}`;
}

function pad(unit) {
    return ('0' + unit).slice(-2);
}

function padMilliseconds(unit) {
    return ('0' + unit).slice(-2);  // Pad to ensure 2 digits for milliseconds
}
