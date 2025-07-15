import { getSentence } from "../data/typing-speed-test-data.js";

let sentence = getSentence();

function displaySentence() {
    sentence = getSentence();
    document.querySelector('.js-sentence-text-display').innerHTML = sentence;
    document.querySelector('.js-input-box').value = '';
    document.querySelector('.js-input-box').disabled = false;

    document.querySelector('.js-text-mistakes').textContent = 0;
    document.querySelector('.js-text-accuracy').textContent = `${100}%`;
}

displaySentence();

document.querySelector('.js-reset-button').addEventListener('click', () => {
    displaySentence();
});


document.querySelector('.js-difficulty-level').addEventListener('change', () => {
    displaySentence();
});


const inputField = document.querySelector('.js-input-box');

let correctWords = 0;
let accuracy = 100;

let timerStarted = false;
let timerLeft = 60;
let timer;

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
        }
        else {
            mistakes++;
        }
    }

    const totalTyped = typedWords.length;

    if (totalTyped > 0) {
        accuracy = ((correctWords / totalTyped) * 100).toFixed(2);
    }
    else {
        accuracy = 100;
    }

    if (typed === '') {
        mistakes = 0;
        accuracy = 100;
    }


    document.querySelector('.js-text-mistakes').textContent = mistakes;
    document.querySelector('.js-text-accuracy').textContent = `${accuracy}%`;
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
}