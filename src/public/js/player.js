const playBtn = document.getElementById("playBtn");

const link = new Audio();
link.src = "https://audio.streaminghd.cl:2000/stream/chanquinafm/;stream.mp3";

// (async () => {
//   await link.play();
// })();

playBtn.addEventListener("click", async () => {
  if (!link.paused) {
    await link.pause();
    playBtn.innerHTML = '<i class="bi bi-play"></i> Play';
  } else {
    await link.play();
    playBtn.innerHTML = '<i class="bi bi-pause"></i> Pause';
  }
});
