const audios = {
  Main_Menu: "./audio/music.mp3",
  VHS_Hum: "./audio/vhs.mp3",
  Button_Click: "./audio/buttonclick.mp3",
  Button_Click2: "./audio/buttonclick2.mp3",
  Alarm: "./audio/alarm.mp3",
  Prom: "./audio/prom.mp3",
  TalkCharAudio: "./audio/talk.mp3",
  FlashAudio: "./audio/flash_audio.mp3",
};

const DOMSelectors = {
  audioContainer: document.querySelector(".audio-container"),
  titleScreenMenu: document.querySelector(".main-menu"),
  antiPrivacyPage: document.querySelector(".anti-privacy-page"),
  assetCreditMenu: document.querySelector(".asset-credit-page"),
  inspirationMenu: document.querySelector(".inspiration-page"),
  flashOverlay: document.querySelector(".flash-overlay"),
};

const soundService = {
  playAudio(name, volume = 1, loop = false) {
    DOMSelectors.audioContainer.insertAdjacentHTML(
      `beforebegin`,
      `<audio controls autoplay ${loop ? "loop" : ""}>
        <source src="${audios[name]}" type="audio/mpeg" />
      </audio>`
    );

    const newAudioElement = DOMSelectors.audioContainer.previousElementSibling;
    newAudioElement.volume = volume;

    if (!loop) {
      newAudioElement.addEventListener("ended", () => {
        newAudioElement.remove();
      });
    }
  },

  playMultipleAudios(names, volume = 1, loop = false) {
    names.forEach((name) => {
      this.playAudio(name, volume, loop);
    });
  },

  removeAllAudio() {
    const audioElements = document.querySelectorAll("audio");
    audioElements.forEach((audio) => {
      audio.remove();
    });
  },
};

const screenService = {
  flashScreen() {
    soundService.playAudio("FlashAudio");
    DOMSelectors.flashOverlay.style.opacity = "1";
    DOMSelectors.flashOverlay.style.pointerEvents = "all";

    let opacity = 1;

    const interval = setInterval(() => {
      opacity -= 0.01;
      if (opacity <= 0) {
        opacity = 0;
        clearInterval(interval);
        DOMSelectors.flashOverlay.style.pointerEvents = "none";
      }
      DOMSelectors.flashOverlay.style.opacity = opacity;
    }, 8);
  },

  antiPrivacySequence() {
    soundService.playAudio("Alarm", 0.2);
    this.alarmInterval = setInterval(() => {
      soundService.playAudio("Alarm", 0.2);
    }, 5000);
    soundService.playAudio("Main_Menu", 1, true);
  },

  route(viewID) {
    DOMSelectors.antiPrivacyPage.style.display = "none";
    DOMSelectors.titleScreenMenu.style.display = "none";
    DOMSelectors.assetCreditMenu.style.display = "none";
    DOMSelectors.inspirationMenu.style.display = "none";

    if (viewID === "enter-game-button") {
      DOMSelectors.antiPrivacyPage.style.display = "block";
      soundService.removeAllAudio();
      this.antiPrivacySequence();
    } else if (viewID === "asset-credit-button") {
      DOMSelectors.assetCreditMenu.style.display = "block";
    } else if (viewID === "inspiration-button") {
      DOMSelectors.inspirationMenu.style.display = "block";
    } else if (viewID === "return") {
      clearInterval(this.alarmInterval);
      this.startScreen();
    }
  },

  startScreen() {
    DOMSelectors.titleScreenMenu.style.display = "block";
    DOMSelectors.antiPrivacyPage.style.display = "none";
    DOMSelectors.assetCreditMenu.style.display = "none";
    DOMSelectors.inspirationMenu.style.display = "none";
  },
};

document.addEventListener("click", function initAudio() {
  soundService.playAudio("VHS_Hum", 1, true);
  soundService.playAudio("Prom", 0.5, true);
  document.removeEventListener("click", initAudio);
});

document.addEventListener("DOMContentLoaded", () => {
  const cursor = document.querySelector(".cursor");

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });

  document.addEventListener("mousedown", () => {
    cursor.style.width = "5px";
    cursor.style.height = "5px";
  });

  document.addEventListener("mouseup", () => {
    cursor.style.width = "10px";
    cursor.style.height = "10px";
  });
});

document.querySelectorAll("button").forEach((Button) => {
  Button.addEventListener("mouseenter", () => {
    Button.textContent = ">> " + Button.textContent;
    soundService.playAudio("Button_Click", 0.25);
  });

  Button.addEventListener("mouseleave", () => {
    if (Button.textContent.startsWith(">> ")) {
      Button.textContent = Button.textContent.slice(2);
    }
  });

  Button.addEventListener("click", () => {
    soundService.playAudio("Button_Click2", 0.25);
    screenService.route(Button.id);
    screenService.flashScreen();
  });
});

screenService.startScreen();
