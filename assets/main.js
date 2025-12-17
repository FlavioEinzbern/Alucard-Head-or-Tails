const idleVideo = document.getElementById('idleVideo');
const actionVideo = document.getElementById('actionVideo');

const videoB = 'videos/heads.mp4';
const videoC = 'videos/tails.mp4';

let isPlayingAction = false;

// crossfade
function crossfade(from, to, duration = 50) {
  to.classList.remove('hidden');
  setTimeout(() => from.classList.add('hidden'), duration);
}

// click 50/50
document.body.addEventListener('click', () => {
  if (isPlayingAction) return; // block double clicks
  isPlayingAction = true;

  const nextVideo = Math.random() < 0.5 ? videoB : videoC;
  actionVideo.src = nextVideo;
  actionVideo.currentTime = 0;
  actionVideo.muted = false;

  // start playback
  actionVideo.play().then(() => {
    crossfade(idleVideo, actionVideo);
  });

  // fade back to looping A after a video
  actionVideo.onended = () => {
    idleVideo.currentTime = 0;
    idleVideo.play();
    crossfade(actionVideo, idleVideo);
    setTimeout(() => {
      actionVideo.classList.add('hidden');
      actionVideo.src = '';
      isPlayingAction = false;
    }, 100); // after fade
  };
});