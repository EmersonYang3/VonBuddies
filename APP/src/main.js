const audios = {
  Main_Menu: "assets/audio/music.mp3",
  VHS_Hum: "assets/audio/vhs.mp3",
  Button_Click: "assets/audio/buttonclick.mp3",
  Button_Click2: "assets/audio/buttonclick2.mp3",
  Alarm: "assets/audio/alarm.mp3",
  Prom: "assets/audio/prom.mp3",
  TalkCharAudio: "assets/audio/talk.mp3",
  FlashAudio: "assets/audio/flash_audio.mp3",
};

const media = {
  TheKing: "https://i.kym-cdn.com/photos/images/newsfeed/002/971/502/e38.gif",
  FNAF_Tile_Sreen:
    "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9f7f5450-750b-4bc5-a478-1aca1e8c0006/de0h8g0-55a06a63-f9a0-414c-9134-6e331b2aaea5.png/v1/fill/w_1192,h_670,q_70,strp/fnaf1_title_screen_by_ropec4d1637_de0h8g0-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzIwIiwicGF0aCI6IlwvZlwvOWY3ZjU0NTAtNzUwYi00YmM1LWE0NzgtMWFjYTFlOGMwMDA2XC9kZTBoOGcwLTU1YTA2YTYzLWY5YTAtNDE0Yy05MTM0LTZlMzMxYjJhYWVhNS5wbmciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.p05LPqZcAP3wgulYe8_mJgkBYDaiYi-vgwOl7LUvQDo",
};

const DOMSelectors = {
  audioContainer: document.querySelector(".audio-container"),
  titleScreenMenu: document.querySelector(".main-menu"),
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
    }, 50);
  },

  route(viewID) {
    DOMSelectors.titleScreenMenu.style.display = "none";
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
