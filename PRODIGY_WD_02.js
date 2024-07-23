// script.js
let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapNumber = 1;

const display = document.getElementById('display');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

function startPause() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(getShowTime, 1);
        startPauseBtn.innerHTML = 'Pause';
        lapBtn.disabled = false;
        running = true;
    } else {
        clearInterval(tInterval);
        startPauseBtn.innerHTML = 'Start';
        running = false;
    }
}

function reset() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    display.innerHTML = '00:00:00';
    startPauseBtn.innerHTML = 'Start';
    lapBtn.disabled = true;
    lapNumber = 1;
    laps.innerHTML = '';
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000) / 10);
    
    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;
    milliseconds = (milliseconds < 10) ? '0' + milliseconds : milliseconds;
    
    display.innerHTML = hours + ':' + minutes + ':' + seconds + ':' + milliseconds;
}

function recordLap() {
    const lapTime = display.innerHTML;
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapNumber}: ${lapTime}`;
    laps.appendChild(lapItem);
    lapNumber++;
}

startPauseBtn.addEventListener('click', startPause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);
