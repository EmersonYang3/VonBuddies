const audios = {
  Main_Menu: "assets/audio/music.mp3",
  VHS_Hum: "assets/audio/vhs.mp3",
  Button_Click: "assets/audio/buttonclick.mp3",
  Button_Click2: "assets/audio/buttonclick2.mp3",
};

const DOMSelectors = {
  audioContainer: document.querySelector(".audio-container"),
};

const soundService = {
  playAudio(name, volume = 1) {
    DOMSelectors.audioContainer.insertAdjacentHTML(
      `beforebegin`,
      `<audio controls autoplay>
        <source src="${audios[name]}" type="audio/mpeg" />
      </audio>`
    );

    const newAudioElement = DOMSelectors.audioContainer.previousElementSibling;
    newAudioElement.addEventListener("ended", () => {
      newAudioElement.remove();
    });
    newAudioElement.volume = volume;
  },
};

document.querySelectorAll("button").forEach((Button) => {
  Button.addEventListener("mouseenter", () => {
    Button.textContent = ">> " + Button.textContent;
    soundService.playAudio("Button_Click");
  });

  Button.addEventListener("mouseleave", () => {
    if (Button.textContent.startsWith(">> ")) {
      Button.textContent = Button.textContent.slice(2);
    }
  });

  Button.addEventListener("click", () => {
    soundService.playAudio("Button_Click2", 0.2);
  });
});
