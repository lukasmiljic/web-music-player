const coverArt = document.querySelectorAll('.album-cover-art')
const albumTitle = document.querySelector('.album-title')
const artist = document.querySelector('.artist-name')
const releaseYear = document.querySelector('.release-year')
const songCountElement = document.querySelector('.song-count')
const albumDurationElement = document.querySelector('.album-duration')
const songCount = 10;
const albumDuration = 51
const text = ""

const playBtn = document.querySelector("#play-btn")
const prevBtn = document.querySelector("#prev")
const nextBtn = document.querySelector("#next")
const musicContainer = document.querySelector('.controls-container');

const audio = document.querySelector('#audio');
// audio.src = `audio/song1.mp3`



// const songs = [
//     'Hit The Lights',
//     'The Four Horsemen',
//     'Motorbreath',
//     'Jump In The Fire',
//     '[Anesthesia] Pulling Teeth',
//     'Whiplash',
//     'Phantom Lord',
//     'No Remorse',
//     'Seek & Destroy',
//     'Metal Militia'
// ];

const songs = [
    {'title':'Hit The Lights', 'length':'3:00', 'trackNumber':'1'},
    {'title':'The Four Horsemen', 'length':'3:00', 'trackNumber':'2'},
    {'title':'Motorbreath', 'length':'3:00', 'trackNumber':'3'},
    {'title':'Jump In The Fire', 'length':'3:00', 'trackNumber':'4'},
    {'title':'[Anesthesia] Pulling Teeth', 'length':'3:00', 'trackNumber':'5'},
    {'title':'Whiplash', 'length':'3:00', 'trackNumber':'6'},
    {'title':'Phantom Lord', 'length':'3:00', 'trackNumber':'7'},
    {'title':'No Remorse', 'length':'3:00', 'trackNumber':'8'},
    {'title':'Seek & Destroy', 'length':'3:00', 'trackNumber':'9'},
    {'title':'Metal Militia', 'length':'3:00', 'trackNumber':'10'},
]

buildTable(songs)

function buildTable(data){
    var table = document.getElementById('song-table')

    for (var i = 0; i < data.length; i++){
        var row = `<tr>
                        <td>${data[i].trackNumber}</td>
                        <td><p class="track-list-tracks" id="${data[i].trackNumber}">${data[i].title}</p></td>
                        <td>${data[i].length}</td>
                    </tr>`
        table.innerHTML += row
    }
}

let songIndex = 5;

const currentSongTitle = document.querySelector('.current-song-title')
const currentArtist = document.querySelector('.current-artist')

loadCoverArt()
albumTitle.innerText = "Kill 'Em All"
artist.innerText = "Metallica"
releaseYear.innerText = "1983"
songCountElement.innerText = text.concat(songCount," songs,");
albumDurationElement.innerText = text.concat(albumDuration," min");


const trackListTrack = document.querySelectorAll(".track-list-tracks");


loadSong(songs[songIndex]);



function loadSong(song){
    currentSongTitle.innerText = song.title
    currentArtist.innerText = "Metallica"
    audio.src = `audio/${song.title}.mp3`
    clearHighlight()
    trackListTrack[song.trackNumber-1].classList.add('highlight-playing');
}

function loadCoverArt(){
    for (let i = 0; i < coverArt.length; i++){
        coverArt[i].src=`img/killemall.jpg`
    }
}

function playSong(){
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fa-solid').classList.remove('fa-play');
    playBtn.querySelector('i.fa-solid').classList.add('fa-pause');
    audio.play();
}

function pauseSong(){
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fa-solid').classList.remove('fa-pause');
    playBtn.querySelector('i.fa-solid').classList.add('fa-play');
    audio.pause();
    

}

function prevSong(){
    songIndex--;
    if(songIndex < 0){
        console.log("reached beginning")    //show pop up message
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

function nextSong(){
    songIndex++;
    if(songIndex >= songs.length){
        console.log("reached end")    //show pop up message
        songIndex --;
    }
    loadSong(songs[songIndex]);
    playSong();
}

playBtn.addEventListener('click',()=>{
    const isPlaying = musicContainer.classList.contains('play');
    if(isPlaying){
        console.log("click pause")
        pauseSong();
    } else{
        playSong();
        console.log("click play")
    }
})

prevBtn.addEventListener('click',prevSong);
nextBtn.addEventListener('click',nextSong);

const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-bar');

function updateProgress(e){
    const {duration, currentTime} = e.srcElement;
    const progressPercent = (currentTime/duration) * 100;
    progress.style.width = `${progressPercent}%` 
}

function setProgress(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX/width) * duration;
}

audio.addEventListener('timeupdate',updateProgress);
progressContainer.addEventListener('click',setProgress);
audio.addEventListener('ended',nextSong);

const volumeBtn = document.querySelector("#volume-btn")
function mute(){
    musicContainer.classList.add('mute');
    volumeBtn.querySelector('i.fa-solid').classList.remove('fa-volume-high');
    volumeBtn.querySelector('i.fa-solid').classList.add('fa-volume-xmark');
    audio.volume = 0.5;
}

function unmute(){
    musicContainer.classList.remove('mute');
    volumeBtn.querySelector('i.fa-solid').classList.remove('fa-volume-xmark');
    volumeBtn.querySelector('i.fa-solid').classList.add('fa-volume-high');
    audio.volume = 1;
}

volumeBtn.addEventListener('click',()=>{
    const isMuted = musicContainer.classList.contains('mute');
    if(!isMuted){
        console.log("mute")
        mute();
    } else{
        unmute();
        console.log("unmute")
    }
})


console.log(trackListTrack)

addLinksToTracks();

function addLinksToTracks(){
    for (let i = 0; i < trackListTrack.length; i++){
        trackListTrack[i].addEventListener('click',()=>{
            songIndex = trackListTrack[i].id - 1
            clearHighlight()
            loadSong(songs[songIndex])
            playSong();
        })
    }
}

function getIndex(x){
    console.log(x)
    return x.rowIndex
}

function clearHighlight(){
    for (let i = 0; i < trackListTrack.length; i++){
        console.log(i)
        trackListTrack[i].classList.remove('highlight-playing')
    }
}
