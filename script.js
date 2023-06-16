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


const songs = [
    {'title':'Hit The Lights', 'length':'4:15', 'trackNumber':'1'},
    {'title':'The Four Horsemen', 'length':'7:12', 'trackNumber':'2'},
    {'title':'Motorbreath', 'length':'3:07', 'trackNumber':'3'},
    {'title':'Jump In The Fire', 'length':'4:41', 'trackNumber':'4'},
    {'title':'[Anesthesia] Pulling Teeth', 'length':'4:14', 'trackNumber':'5'},
    {'title':'Whiplash', 'length':'4:08', 'trackNumber':'6'},
    {'title':'Phantom Lord', 'length':'5:01', 'trackNumber':'7'},
    {'title':'No Remorse', 'length':'6:26', 'trackNumber':'8'},
    {'title':'Seek & Destroy', 'length':'6:54', 'trackNumber':'9'},
    {'title':'Metal Militia', 'length':'5:11', 'trackNumber':'10'},
]

buildTable(songs)

function buildTable(data){
    var table = document.getElementById('song-table')

    for (var i = 0; i < data.length; i++){
        var row = `<tr>
                        <td>${data[i].trackNumber}</td>
                        <td><p class="track-list-tracks" id="${data[i].trackNumber}">${data[i].title}</p></td>
                        <td class=track-list-length>${data[i].length}</td>
                    </tr>`
        table.innerHTML += row
    }
}

let songIndex = 0;

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
    const songDuration = document.querySelector(".song-duration")
    songDuration.innerText = song.length
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
    const currentMinute = document.querySelector("#current-minute")
    const currentSecond = document.querySelector("#current-second")

    let s = parseInt(audio.currentTime % 60); 
    let m = parseInt((audio.currentTime / 60) % 60);
    currentMinute.innerText = m
    currentSecond.innerText = (s<10?"0":"")+s;
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




const colorThief = new ColorThief()
const img = document.querySelector('img')
const dot = document.querySelector('.dot')

if(img.complete){
    getDominantColor(img)
} else {
    img.addEventListener('load', function() {
    getDominantColor(img)
});
}

function getDominantColor(img){
    const dominantRGB = colorThief.getColor(img)
    setDominantColor(dominantRGB)
    generatePallette(dominantRGB)
    console.log(dominantRGB)
}

function setDominantColor(rgbCode){
    const r = document.querySelector(':root')
    r.style.setProperty('--dominant-color',`rgb(${rgbCode[0]},${rgbCode[1]},${rgbCode[2]})`)
}

function generatePallette(rgbCode){
    const r = document.querySelector(':root')
    let modifier = -0.5
    let R = rgbCode[0] + modifier*rgbCode[0]
    let G = rgbCode[1] + modifier*rgbCode[1]
    let B = rgbCode[2] + modifier*rgbCode[2]

    r.style.setProperty('--dominant-color2',`rgb(${R},${G},${B})`)

    modifier = -0.6
    R = rgbCode[0] + modifier*rgbCode[0]
    G = rgbCode[1] + modifier*rgbCode[1]
    B = rgbCode[2] + modifier*rgbCode[2]

    r.style.setProperty('--dominant-color3',`rgb(${R},${G},${B})`)
}
