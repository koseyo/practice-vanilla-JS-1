const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');

const data = [
    {
        image: './img/drink.jpg',
        text: "のどが渇いた"
    },
    {
        image: './img/food.jpg',
        text: "おなかがすいた"
    },
    {
        image: './img/tired.jpg',
        text: "とても眠いです"
    },
    {
        image: './img/hurt.jpg',
        text: "全身が痛い"
    },
    {
        image: './img/happy.jpg',
        text: "とても驚きました"
    },
    {
        image: './img/angry.jpg',
        text: "とてもイライラしています"
    },
    {
        image: './img/sad.jpg',
        text: "すごく悲しい"
    },
    {
        image: './img/scared.jpg',
        text: "道に迷いました"
    },
    {
        image: './img/outside.jpg',
        text: "外に出かけたい"
    },
    {
        image: './img/home.jpg',
        text: "家でゆっくりしたい"
    },
    {
        image: './img/school.jpg',
        text: "勉強がしたいです"
    },
    {
        image: './img/grandma.jpg',
        text: "おばあちゃんとわたし"
    },
];

data.forEach(createBox);

// create speech
function createBox(item) {
    const box = document.createElement('div');

    const { image, text } = item;

    box.classList.add('box');
    box.innerHTML = `
        <img src="${image}" alt="${text}" />
        <p class="info">${text}</p>
    `;

    box.addEventListener('click', () => {
        setTextMessage(text);
        speakText();

        // add active effect
        box.classList.add('active');
        setTimeout(() => box.classList.remove('active'), 800);
    });
    // speak event
    main.appendChild(box);
}

// init speech synth
const message = new SpeechSynthesisUtterance();

// store voices
let voices = [];

function getVoices() {
    voices = speechSynthesis.getVoices();

    voices.forEach(voice => {
        const option = document.createElement('option');

        option.value = voice.name;
        option.innerText = `${voice.name} ${voice.lang}`;

        voicesSelect.appendChild(option);
    });
}

// set text
function setTextMessage(text) {
    message.text = text;
}

// speak text
function speakText() {
    speechSynthesis.speak(message);
}

// set voice
function setVoice(e) {
    message.voice = voices.find(voice => voice.name === e.target.value);
}

// voices changed
speechSynthesis.addEventListener('voiceschanged', getVoices);

// toggle text btn
toggleBtn.addEventListener('click', toggleShow);
function toggleShow() {
    document.getElementById('text-box').classList.toggle('show');

    if(toggleBtn.innerText === 'テキストボックスを戻す') {
        toggleBtn.innerText = 'テキストボックスを出す'
    } else if(toggleBtn.innerText === 'テキストボックスを出す') {
        toggleBtn.innerText = 'テキストボックスを戻す'
    }
}

closeBtn.addEventListener('click', () => document.getElementById('text-box').classList.remove('show'));

// change voice
voicesSelect.addEventListener('change', setVoice);

// read text button
readBtn.addEventListener('click', () => {
    setTextMessage(textarea.value);
    speakText();
});

getVoices();