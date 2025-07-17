import { getSentence } from "../data/typing-speed-test-data.js";

let timerLeft = 60;
let timerStarted = false;
let timer;

let sentence = getSentence();
let inputField = document.querySelector('.js-input-box');

let correctWords = 0;
let accuracy = 100;

function resetStatistics(timerLeft) {
    document.querySelector('.js-timer').innerHTML = `00:${timerLeft}`;
    document.querySelector('.js-wpm').innerHTML = 0;
    document.querySelector('.js-text-mistakes').innerHTML = 0;
    document.querySelector('.js-text-accuracy').innerHTML = `100%`;
}

function displaySentence() {
    clearInterval(timer);
    timerStarted = false;
    timerLeft = 60;

    sentence = getSentence();
    correctWords = 0;
    accuracy = 100;

    document.querySelector('.js-sentence-text-display').innerHTML = sentence;
    inputField.value = '';
    inputField.disabled = false;

    resetStatistics(timerLeft);
}

displaySentence();
displayHighScores();


inputField.addEventListener('input', () => {
    if (!timerStarted) {
        timerStarted = true;
        startTimer();
    }

    const typed = inputField.value;
    const typedWords = typed.trim().split(/\s+/);
    const sentenceWords = sentence.trim().split(/\s+/);

    let mistakes = 0;
    correctWords = 0;

    for (let i = 0; i < typedWords.length; i++) {
        if (typedWords[i] === sentenceWords[i]) {
            correctWords++;
        } else {
            mistakes++;
        }
    }

    const totalTyped = typedWords.length;

    if (totalTyped > 0) {
        accuracy = ((correctWords / totalTyped) * 100).toFixed(2);
    } else {
        accuracy = 100;
    }

    if (typed === '') {
        mistakes = 0;
        accuracy = 100;
    }

    document.querySelector('.js-text-mistakes').textContent = mistakes;
    document.querySelector('.js-text-accuracy').textContent = `${accuracy}%`;
});


document.querySelector('.js-reset-button').addEventListener('click', () => {
    displaySentence();
});

document.querySelector('.js-difficulty-level').addEventListener('change', () => {
    displaySentence();
});

function startTimer() {
    timer = setInterval(() => {
        timerLeft--;
        updateTimerDisplay();

        if (timerLeft === 0) {
            clearInterval(timer);
            inputField.disabled = true;
            displayWPM();
        }
    }, 1000);

    updateTimerDisplay();
}

function updateTimerDisplay() {
    document.querySelector('.js-timer').textContent = `00:${timerLeft < 10 ? '0' + timerLeft : timerLeft}`;
}

function displayWPM() {
    const wpm = Math.round(correctWords);
    document.querySelector('.js-wpm').innerHTML = wpm;

    calculateHighScores(wpm);
}

function calculateHighScores(wpm) {
    const highWPM = localStorage.getItem('highWPMScore');
    const highAccuracy = localStorage.getItem('highAccuracyScore');

    const numericAccuracy = Number(accuracy);

    if (!highWPM || wpm > Number(highWPM)) {
        localStorage.setItem('highWPMScore', wpm);
    }

    if (!highAccuracy || numericAccuracy > Number(highAccuracy)) {
        localStorage.setItem('highAccuracyScore', numericAccuracy);
    }

    displayHighScores();
}

function displayHighScores() {
    const highWPM = localStorage.getItem('highWPMScore') ?? '0';
    const highAccuracy = localStorage.getItem('highAccuracyScore') ?? '0.00';

    document.querySelector('.js-high-wpm').textContent = highWPM;
    document.querySelector('.js-high-accuracy').textContent = `${highAccuracy}%`;
}