const yesBtn = document.getElementById("yesBtn");
const maybeBtn = document.getElementById("maybeBtn");
const noBtn = document.getElementById("noBtn");
const heartsLayer = document.getElementById("hearts");
const overlay = document.getElementById("overlay");

// --- Fond animé : cœurs/étoiles qui tombent ---
const icons = ["💖", "💕", "💘", "❤️", "✨", "⭐️"];

function spawnFallingIcon() {
  const el = document.createElement("span");
  el.className = "fall";
  el.textContent = icons[Math.floor(Math.random() * icons.length)];

  el.style.left = `${Math.random() * 100}vw`;
  el.style.animationDuration = `${4 + Math.random() * 5}s`;
  el.style.fontSize = `${16 + Math.random() * 20}px`;

  heartsLayer.appendChild(el);

  // nettoyage
  setTimeout(() => el.remove(), 10000);
}
setInterval(spawnFallingIcon, 220);

// --- Overlay message (au centre) ---
let hideTimer = null;

function showCenterMessage(htmlText) {
  overlay.innerHTML = `<div class="bubble wiggle">${htmlText}</div>`;
  overlay.classList.add("show");

  // relance animation wiggle
  const bubble = overlay.querySelector(".bubble");
  bubble.classList.remove("wiggle");
  void bubble.offsetWidth;
  bubble.classList.add("wiggle");

  clearTimeout(hideTimer);
  hideTimer = setTimeout(() => overlay.classList.remove("show"), 2600);
}

// --- Particules (bisous etc.) ---
function popAt(x, y, emoji) {
  const el = document.createElement("span");
  el.className = "pop";
  el.textContent = emoji;
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1100);
}

function kissBurst(amount = 36) {
  for (let i = 0; i < amount; i++) {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const em = Math.random() > 0.25 ? "😘" : "💋";
    setTimeout(() => popAt(x, y, em), i * 18);
  }
}

// boost de cœurs (en plus du fond)
function heartsBurst(amount = 80) {
  for (let i = 0; i < amount; i++) {
    setTimeout(spawnFallingIcon, i * 12);
  }
}

// --- Actions boutons ---
yesBtn.addEventListener("click", () => {
  showCenterMessage("I’m the luckiest ❤️");
  kissBurst(80);
  heartsBurst(120);
});

maybeBtn.addEventListener("click", () => {
  showCenterMessage("😢 I’ll wait…");
  for (let i = 0; i < 16; i++) {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const em = Math.random() > 0.5 ? "🥺" : "💔";
    setTimeout(() => popAt(x, y, em), i * 35);
  }
});

// --- NO qui s’échappe (iPad friendly) ---
function moveNoButton() {
  const padding = 16;
  const maxX = Math.max(0, window.innerWidth - noBtn.offsetWidth - padding);
  const maxY = Math.max(0, window.innerHeight - noBtn.offsetHeight - padding);

  noBtn.style.position = "fixed";
  noBtn.style.left = `${Math.floor(Math.random() * maxX)}px`;
  noBtn.style.top = `${Math.floor(Math.random() * maxY)}px`;
  noBtn.style.zIndex = "9999";
}

// iPad / tactile : au toucher
noBtn.addEventListener("pointerdown", (e) => {
  e.preventDefault();
  moveNoButton();
  popAt(window.innerWidth * 0.5, window.innerHeight * 0.45, "💨");
});

// ordi : au survol
noBtn.addEventListener("mouseenter", moveNoButton);
