const deliveryVideo = document.querySelector(".delivery-services-video video");
const playButton = document.querySelector(".play-button");
const popupContainer = document.querySelector(".popup-video-container");
const popupVideo = document.querySelector(".popup-video-container video");
const closeButton = document.querySelector(".close-btn");

deliveryVideo.addEventListener("timeupdate", () => {
  if (deliveryVideo.currentTime > 4) {
    deliveryVideo.currentTime = 0;
  }
});

playButton.addEventListener("click", () => {
  popupContainer.style.display = "flex";
  popupVideo.play();
});

closeButton.addEventListener("click", () => {
  popupContainer.style.display = "none";
  popupVideo.pause();
  popupVideo.currentTime = 0;
});
