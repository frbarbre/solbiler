function loadingScreen() {
  setTimeout(function () {
    window.location.href = "forside.html";
  }, 5500);
}

let counter = document.querySelector(".counter");

setTimeout(function () {
  for (let i = 0; i < 101; i++) {
    setTimeout(function () {
      counter.innerHTML = i + "%";
    }, i * 38);
  }
}, 1000);