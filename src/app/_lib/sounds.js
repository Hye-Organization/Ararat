export function playLoadingSound() {
  const audio = new Audio("/sounds/loading.wav");
  audio.loop = true;
  audio.play();
  return function stopLoadingSound() {
    audio.pause();
  };
}

export function playErrorSound() {
  const audio = new Audio("/sounds/error.wav");
  audio.play();
}
