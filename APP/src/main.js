const audios = {
  Main_Menu: "assets/audio/music.mp3",
  VHS_Hum: "assets/audio/vhs.mp3",
  Button_Click: "assets/audio/buttonclick.mp3",
  Button_Click2: "assets/audio/buttonclick2.mp3",
  Alarm: "assets/audio/alarm.mp3",
};

const media = {
  TheKing: "https://i.kym-cdn.com/photos/images/newsfeed/002/971/502/e38.gif",
  FNAF_Tile_Sreen:
    "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9f7f5450-750b-4bc5-a478-1aca1e8c0006/de0h8g0-55a06a63-f9a0-414c-9134-6e331b2aaea5.png/v1/fill/w_1192,h_670,q_70,strp/fnaf1_title_screen_by_ropec4d1637_de0h8g0-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzIwIiwicGF0aCI6IlwvZlwvOWY3ZjU0NTAtNzUwYi00YmM1LWE0NzgtMWFjYTFlOGMwMDA2XC9kZTBoOGcwLTU1YTA2YTYzLWY5YTAtNDE0Yy05MTM0LTZlMzMxYjJhYWVhNS5wbmciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.p05LPqZcAP3wgulYe8_mJgkBYDaiYi-vgwOl7LUvQDo",
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

  playMultipleAudios(names, volume = 1) {
    names.forEach((name) => {
      this.playAudio(name, volume);
    });
  },
};

document.addEventListener("click", function initAudio() {
  soundService.playAudio("VHS_Hum");
  document.removeEventListener("click", initAudio);
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
  });
});
