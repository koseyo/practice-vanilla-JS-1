const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-again');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['programming', 'practice', 'portfolio', 'study', 'everyday'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = ['p', 'r', 's', 'y'];
const wrongLetters = [];

// show hidden word
function displayWord() {
    wordEl.innerHTML = `${selectedWord.split('').map(letter => 
        `<span class="letter">${correctLetters.includes(letter) ? letter : ''}</span>`
        ).join('')}`;
    
    const innerWord = wordEl.innerText.replace(/\n/g, '');
    
    if(innerWord === selectedWord) {
        finalMessage.innerText = '正解です おめでとうございます(*´ω｀)';
        popup.style.display = 'flex';
    }
}

// wrong letter
function updateWrongLettersEl() {
    wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>はずれ</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;

        if(index < errors) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    });

    if(wrongLetters.length === figureParts.length) {
        finalMessage.innerText = 'ゲームオーバーです 残念(T_T)'
        popup.style.display = 'flex';
    }
}

// show notification
function showNotification() {
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

// keydown
window.addEventListener('keydown', e => {
    if(e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;

        if(selectedWord.includes(letter)) {
            if(!correctLetters.includes(letter)) {
                correctLetters.push(letter);

                displayWord();
            } else {
                showNotification();
            }
        } else {
            if(!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);

                updateWrongLettersEl();
            } else {
                showNotification();
            }
        }
    }
});

// restart
playAgainBtn.addEventListener('click', () => {
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = words[Math.floor(Math.random() * words.length)];

    displayWord();

    updateWrongLettersEl();

    popup.style.display = 'none';
});

displayWord();