const apiURL = 'https://api.lyrics.ovh';

const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');

// search by song or artist
async function searchSongs(term) {
    const res = await fetch(`${apiURL}/suggest/${term}`);
    const data = await res.json();

    showData(data);
}

// show data
function showData(data) {
    result.innerHTML = `
        <ul class="songs">
            ${data.data.map(song => `
        <li>
            <span><strong>${song.artist.name}</strong> - ${song.title}</span>
            <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">歌詞を見る</button>
        </li>
        `).join('')
        }
        </ul>
    `;

    if(data.prev || data.next) {
        more.innerHTML = `
            ${data.prev ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">前の曲</button>` : ''}
            ${data.next ? `<button class="btn" onclick="getMoreSongs('${data.next}')">次の曲</button>` : ''}
        `;
    } else {
        more.innerHTML = '';
    }
}

// get prev and next song
 async function getMoreSongs(url) {
    const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
    const data = await res.json();

    showData(data);
}

// get lyrics for song
async function getLyrics(artist, songTitle) {
    const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
    const data = await res.json();

    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');

    result.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2>
    <span>${lyrics}</span>`;

    more.innerHTML = '';
};

// event listener
form.addEventListener('submit', e => {
    e.preventDefault();

    const searchTerm = search.value.trim();
    
    if(!searchTerm) {
        alert('アーティスト、または歌詞をアルファベットで入力して下さい');
    } else {
        searchSongs(searchTerm);
    }
});

// get lyrics
result.addEventListener('click', e => {
    const clickedEl = e.target;

    if(clickedEl.tagName === 'BUTTON') {
        const artist = clickedEl.getAttribute('data-artist');
        const songTitle = clickedEl.getAttribute('data-songtitle');

        getLyrics(artist, songTitle);
    }
});