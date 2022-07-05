"use strict";

const musicContainer = document.querySelector("#audio-container");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const playBtn = document.querySelector("#play");
const audio = document.querySelector("#audio");
const progresContainer = document.querySelector("#progres-container");
const progress = document.querySelector("#progress");
const title = document.querySelector("#title");
const cover = document.querySelector("#cover");
let songs = ["milliy bola", "tushdi kech", "yulduz"];
let songsIndex = 0;
function loadSong(song) {
  title.innerHTML = song;
  cover.src = `images/${song}.jpg`;
  audio.src = `music/${song}.mp3`;
}
loadSong(songs[songsIndex]);

function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fa-solid").classList.remove("fa-play");
  playBtn.querySelector("i.fa-solid").classList.add("fa-pause");

  audio.play();
}

function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fa-solid").classList.add("fa-play");
  playBtn.querySelector("i.fa-solid").classList.remove("fa-pause");
  audio.pause();
}

function prevSong() {
  songsIndex--;
  if (songsIndex < 0) {
    songsIndex = songs.length - 1;
  }
  loadSong(songs[songsIndex]);
  playSong();
}

function nextSong() {
  songsIndex++;
  if (songsIndex > songs.length - 1) {
    songsIndex = 0;
  }
  loadSong(songs[songsIndex]);
  playSong();
}

function updateProggres(e) {
  const { duration, currentTime } = e.srcElement;
  const progresPercent = (currentTime / duration) * 100;
  progress.style.width = `${progresPercent}%`;
}

function setProgres(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
audio.addEventListener("timeupdate", updateProggres);
progresContainer.addEventListener("click", setProgres);
audio.addEventListener("ended", nextSong);
