import { easySentences, mediumSentences, hardSentences } from "../data/typing-speed-test-data.js";


function displaySentence() {
    document.querySelector('.js-sentence-text-display').innerHTML = getSentence();
}

displaySentence();

function getSentence() {
    const difficultyLevel = document.querySelector('.js-difficulty-level').value;

    let sentence = '';
    if (difficultyLevel === 'easy') {
        const index = Math.floor(Math.random() * easySentences.length);
        sentence = easySentences[index];
    }
    else if (difficultyLevel === 'medium') {
        const index = Math.floor(Math.random() * mediumSentences.length);
        sentence = mediumSentences[index];
    }
    else if (difficultyLevel === 'hard') {
        const index = Math.floor(Math.random() * hardSentences.length);
        sentence = hardSentences[index];
    }

    return sentence;
}

document.querySelector('.js-reset-button').addEventListener('click', () => {
    displaySentence();
});


document.querySelector('.js-difficulty-level').addEventListener('change', () => {
    displaySentence();
});