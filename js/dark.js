const changeMoon = (moon, mode) => {
  let stop = 0;

  const loop = () => {
    moon.innerHTML = mode[stop];

    if (stop < mode.length - 1) {
      setTimeout(loop, 50);
      stop++;
    }
  };
  loop();
};

const moonMode = async () => {
  const doby = document.body;
  const moon = document.querySelector(".moon-mode");
  const bright = ["🌝", "🌕", "🌖", "🌗", "🌘", "🌑", "🌚"];
  const dark = ["🌚", "🌑", "🌒", "🌓", "🌔", "🌕", "🌝"];

  let theme = localStorage.getItem("theme");
  if (theme === null) {
    return localStorage.setItem("theme", "bright");
  }

  if (theme === "bright") {
    changeMoon(moon, bright);
    moon.classList.remove("bright");
    doby.classList.remove("dark");
    localStorage.setItem("theme", "bright");
  } else if (theme === "dark") {
    changeMoon(moon, dark);
    moon.classList.add("bright");
    doby.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }

  moon.addEventListener("click", (e) => {
    theme = localStorage.getItem("theme");
    console.log(2, theme);
    if (theme === "bright") {
      console.log(4);
      changeMoon(moon, dark);
      moon.classList.add("bright");
      doby.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "bright");
      changeMoon(moon, bright);
      moon.classList.remove("bright");
      doby.classList.remove("dark");
      console.log(5);
    }
  });
};

const main = async () => {
  moonMode();
};

document.addEventListener("DOMContentLoaded", main);
