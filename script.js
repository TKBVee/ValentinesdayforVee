const yesBtn = document.getElementById("yesBtn");
const maybeBtn = document.getElementById("maybeBtn");
const noBtn = document.getElementById("noBtn");
const heartsLayer = document.getElementById("hearts");
const overlay = document.getElementById("overlay");

// -------- Fond animé (cœurs/étoiles qui tombent) --------
const icons = ["💖", "💕", "💘", "❤️", "✨", "⭐️"];

function spawnIcon() {
  const el = document.createElement("span");
  el.className = "fall";
  el.textContent = icons[Math.floor(Math.random() * icons.length)];

  el.style.left = `${Math.random() * 100}vw`;
  el.style.animationDuration = `${4 + Math.random() * 5}s`;
  el.style.fontSize = `${16 + Math.random() * 20}px`;

  heartsLayer.appendChild(el);
  setTimeout(() => el.remove(), 10000);
}
setInterval(spawnIcon, 220);

// -------- Message au centre (gros + bouge) --------
let hideTimer = null;

function showCenterMessage(text) {
  overlay.innerHTML = `<div class="bubble wiggle">${text}</div>`;
  overlay.classList.add("show");

  // relancer l’animation wiggle à chaque fois
  const bubble = overlay.querySelector(".bubble");
  bubble.classList.remove("wiggle");
  void bubble.offsetWidth; // reset animation
  bubble.classList.add("wiggle");

  clearTimeout(hideTimer);
  hideTimer = setTimeout(() => {
    overlay.classList.remove("show");
  }, 2200);
}

// -------- Bisous qui pop --------
function popAt(x, y, emoji) {
  const el = document.createElement("span");
  el.className = "pop";
  el.textContent = emoji;
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1100);
}

function kissBurst(amount = 22) {
  for (let i = 0; i < amount; i++) {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const em = Math.random() > 0.25 ? "😘" : "💋";
    setTimeout(() => popAt(x, y, em), i * 20);
  }
}

// -------- Actions boutons --------
yesBtn.addEventListener("click", () => {
  showCenterMessage("Je t’aime ❤️<br>t’es la meilleure chose qui me soit arrivée");
  kissBurst(34);
  // boost de cœurs en plus
  for (let i = 0; i < 60; i++) setTimeout(spawnIcon, i * 15);
});

maybeBtn.addEventListener("click", () => {
  showCenterMessage("😢 I’ll wait…");
  for (let i = 0; i < 14; i++) {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const em = Math.random() > 0.5 ? "🥺" : "💔";
    setTimeout(() => popAt(x, y, em), i * 35);
  }
});

// -------- NO qui s’échappe (iPad friendly) --------
function moveNoButton() {
  const padding = 16;
  const maxX = Math.max(0, window.innerWidth - noBtn.offsetWidth - padding);
  const maxY = Math.max(0, window.innerHeight - noBtn.offsetHeight - padding);

  noBtn.style.position = "fixed";
  noBtn.style.left = `${Math.floor(Math.random() * maxX)}px`;
  noBtn.style.top = `${Math.floor(Math.random() * maxY)}px`;
  noBtn.style.zIndex = "9999";
}

// iPad: au toucher
noBtn.addEventListener("pointerdown", (e) => {
  e.preventDefault();
  moveNoButton();
  popAt(window.innerWidth * 0.5, window.innerHeight * 0.45, "💨");
});

// ordi: au survol
noBtn.addEventListener("mouseenter", moveNoButton);
