const idleVideo = document.getElementById('idleVideo');
const actionVideo = document.getElementById('actionVideo');

const preloadHeads = document.getElementById('preloadHeads');
const preloadTails = document.getElementById('preloadTails');

let isPlayingAction = false;

// reduce lag
preloadHeads.load();
preloadTails.load();

// crossfade
function crossfade(from, to, duration = 50) {
  to.classList.remove('hidden');
  setTimeout(() => from.classList.add('hidden'), duration);
}

document.body.addEventListener('click', () => {
  if (isPlayingAction) return;
  isPlayingAction = true;

  const chosen =
    Math.random() < 0.5 ? preloadHeads : preloadTails;

  actionVideo.src = chosen.currentSrc;
  actionVideo.currentTime = 0;
  actionVideo.muted = false;

  actionVideo.play().then(() => {
    crossfade(idleVideo, actionVideo);
  });

  actionVideo.onended = () => {
    idleVideo.currentTime = 0;
    idleVideo.play();
    crossfade(actionVideo, idleVideo);

    setTimeout(() => {
      actionVideo.classList.add('hidden');
      actionVideo.src = '';
      isPlayingAction = false;
    }, 100);
  };
});
