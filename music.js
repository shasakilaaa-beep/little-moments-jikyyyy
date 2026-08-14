const music = document.getElementById("loveMusic");
const musicBtn = document.getElementById("musicBtn");

const MUSIC_TIME = "ikyJihanMusicTime";
const MUSIC_PLAYING = "ikyJihanMusicPlaying";

let shouldPlay =
  localStorage.getItem(MUSIC_PLAYING) === "true";

if (music) {

  music.addEventListener("loadedmetadata", () => {

    const savedTime = parseFloat(
      localStorage.getItem(MUSIC_TIME) || "0"
    );

    if (
      savedTime > 0 &&
      savedTime < music.duration
    ) {
      music.currentTime = savedTime;
    }

    if (shouldPlay) {

      music.play()
        .then(() => {
          updateMusicButton(true);
        })
        .catch(() => {
          updateMusicButton(false);
        });

    }

  });


  music.addEventListener("timeupdate", () => {

    localStorage.setItem(
      MUSIC_TIME,
      music.currentTime
    );

  });


  musicBtn?.addEventListener("click", async () => {

    try {

      if (music.paused) {

        await music.play();

        shouldPlay = true;

        localStorage.setItem(
          MUSIC_PLAYING,
          "true"
        );

        updateMusicButton(true);

      } else {

        music.pause();

        shouldPlay = false;

        localStorage.setItem(
          MUSIC_PLAYING,
          "false"
        );

        localStorage.setItem(
          MUSIC_TIME,
          music.currentTime
        );

        updateMusicButton(false);

      }

    } catch (error) {

      alert("tekan tombol musik sekali lagi yaa 💗");

    }

  });


  function updateMusicButton(isPlaying) {

    if (!musicBtn) return;

    musicBtn.textContent = isPlaying
      ? "⏸️ matiin lagu"
      : "🎵 putar I Lay My Love On You";

  }

}
