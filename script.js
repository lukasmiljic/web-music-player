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


const songs = [
    'Hit The Lights',
    'The Four Horsemen',
    'Motorbreath',
    'Jump In The Fire',
    '[Anesthesia] Pulling Teeth',
    'Whiplash',
    'Phantom Lord',
    'No Remorse',
    'Seek & Destroy',
    'Metal Militia'
];

let songIndex = 5;

const currentSongTitle = document.querySelector('.current-song-title')
const currentArtist = document.querySelector('.current-artist')

loadCoverArt('kill em all')
albumTitle.innerText = "Kill 'Em All"
artist.innerText = "Metallica"
releaseYear.innerText = "1983"
songCountElement.innerText = text.concat(songCount," songs,");
albumDurationElement.innerText = text.concat(albumDuration," min");

loadSong(songs[songIndex]);

function loadSong(song){
    currentSongTitle.innerText = song
    currentArtist.innerText = "Metallica"
    audio.src = `audio/${song}.mp3`
}

function loadCoverArt(song){
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
