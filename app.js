let searchInput = document.querySelector('.search-bar #search');

document.querySelector('.search-bar #search').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        displaySongResults();
    }
});



let cards = document.querySelector('.cards');

async function displaySongResults() {

    let res = await getTrackData(searchInput.value);
    cards.innerHTML = '';

    res.forEach(song => {
        let songCard = document.createElement('div');
        songCard.className = 'song-card';
        songCard.setAttribute('onclick', 'displayModal(this)');
        let artistNames = [];
        song.artists.forEach(artist => {
            artistNames.push(" " + artist.name);
        })
        songCard.innerHTML = `
        <div class="song-image">
            <img src="${song.album.images[1].url}" alt="Cover photo">
        </div>
        
        <div class="song-info">
            <div class="song-title">
                <h4>${song.name}</h4>
            </div>
            <div class="description">
                <span class="release-year">${song.album.release_date.substring(0, 4)}</span>
                <span id="separator"> . </span>
                <span class="artist">${ artistNames}</span>
            </div>
            <div class="like-button">
                <i class="fa-regular fa-heart" onclick="addToLikedSongs(this)"></i>
            </div>
            <div class="play-pause-button button">
                <i src="${song.preview_url}">Play</i>
                
            </div>
        </div>`;

        cards.append(songCard);

        // console.log(`SONG: ${song.name}, Url: ${song.preview_url}`);
    });

    console.log(res);

}



function addToLikedSongs(elem) {
    // let likedSongs = [];
    if (elem.classList.contains('fa-regular')) {
        elem.classList = "fa-sharp fa-solid fa-heart"
        elem.style.color = 'red';
        elem.style.transition = 'linear 0.3s'
    }
    else {
        elem.classList = 'fa-regular fa-heart';
        elem.style.color = 'black';

    }
    console.log(likedSongs);

}


function displayModal(elem) {
    console.log(elem);

    let contentBody = document.querySelector('.content-body');

    let modal = document.createElement('div');
    modal.setAttribute('class', 'modal');
    modal.setAttribute('id', 'myModal');
    modal.style.display = 'block';


    let innerContent = document.createElement('div');
    innerContent.setAttribute('class', 'modal-content');
    let closeBtn = document.createElement('span');
    closeBtn.setAttribute('class', 'close');

    let img = document.createElement('img');
    img.src = elem.children[0].children[0].src;
    img.style.borderRadius = '8px'

    let rightDiv = document.createElement('div');
    rightDiv.className = 'right-div';
    rightDiv.style.display = 'flex';
    rightDiv.style.flexDirection = 'column';
    rightDiv.style.justifyContent = 'space-between'

    let songName = document.createElement('h2');
    songName.innerHTML = elem.children[1].children[0].innerText;
    songName.style.color = 'black';

    let artists = document.createElement('h4');
    artists.innerHTML = `By: ${elem.children[1].children[1].children[2].innerText}`;
    artists.style.color = 'beige';
    artists.style.fontWeight = 'lighter'
    artists.style.fontSize = '1rem';


    let audio = document.createElement('audio');
    audio.setAttribute('controls', '')
    audio.src = elem.children[1].children[3].children[0].getAttribute('src');


    rightDiv.append(songName);
    rightDiv.append(artists);
    rightDiv.append(audio);

    innerContent.append(closeBtn);
    innerContent.append(img);
    innerContent.append(rightDiv);
    audio.play();

    closeBtn.onclick = function () {
        modal.style.display = "none";
    }

    modal.append(innerContent);

    contentBody.append(modal);


    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            audio.pause();
        }
    }
}




function displaySidebar() {
    let leftContainer = document.querySelector('.left-container');
    leftContainer.style.display = 'unset';

    leftContainer.style.width = '100%';
    leftContainer.style.position = 'absolute';
    leftContainer.style.zIndex = '1';
    leftContainer.style.border = 'none';
    leftContainer.style.backgroundColor = 'black';

    let closeBtn = document.createElement('a');
    closeBtn.style.position = 'absolute';
    closeBtn.style.left = '50%';
    closeBtn.style.color = 'grey';
    closeBtn.style.margin = 'auto';
    closeBtn.innerText = 'Close';
    closeBtn.style.bottom = '0';


    closeBtn.onclick = function () {
        leftContainer.style.display = 'none';
    }
    leftContainer.append(closeBtn);

}