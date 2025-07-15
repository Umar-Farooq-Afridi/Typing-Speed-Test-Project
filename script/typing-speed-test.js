import { getSentence } from "../data/typing-speed-test-data.js";

let sentence = getSentence();

function displaySentence() {
    sentence = getSentence();
    document.querySelector('.js-sentence-text-display').innerHTML = sentence;
    document.querySelector('.js-input-box').value = '';

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

inputField.addEventListener('input', () => {
    const typed = inputField.value;

    const typedWords = typed.trim().split(/\s+/); // split by ANY space
    const sentenceWords = sentence.trim().split(/\s+/);

    let correctWords = 0;
    let mistakes = 0;

    for (let i = 0; i < typedWords.length; i++) {
        if (typedWords[i] === sentenceWords[i]) {
            correctWords++;
        }
        else {
            mistakes++;
        }
    }

    const totalTyped = typedWords.length;

    let accuracy;
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