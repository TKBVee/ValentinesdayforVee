const yesBtn = document.getElementById("yesBtn");
const maybeBtn = document.getElementById("maybeBtn");
const noBtn = document.getElementById("noBtn");
const message = document.getElementById("message");
const heartsLayer = document.getElementById("hearts");
const wrap = document.querySelector(".wrap");

// --- Fond animé (cœurs/étoiles qui tombent) ---
const icons = ["💖", "💕", "💘", "❤️", "✨", "⭐️"];

function spawnIcon() {
  const el = document.createElement("span");
  el.className = "fall";
  el.textContent = icons[Math.floor(Math.random() * icons.length)];

  const left = Math.random() * 100;
  const duration = 4 + Math.random() * 5;
  const size = 16 + Math.random() * 20;

  el.style.left = `${left}vw`;
  el.style.animationDuration = `${duration}s`;
  el.style.fontSize = `${size}px`;

  heartsLayer.appendChild(el);
  setTimeout(() => el.remove(), duration * 1000 + 200);
}
setInterval(spawnIcon, 220);

// --- Utilitaires effets ---
function setMessage(text) {
  message.textContent = text;
}

function wizz(el) {
  el.classList.remove("wizz");
  void el.offsetWidth; // reset animation
  el.classList.add("wizz");
}

function pulse(el) {
  el.classList.remove("pulse");
  void el.offsetWidth;
  el.classList.add("pulse");
}

// Petites particules (bisous etc.) à un endroit précis
function popAt(x, y, emoji = "😘") {
  const el = document.createElement("span");
  el.className = "pop";
  el.textContent = emoji;
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1100);
}

// Explosion de bisous autour d’un élément
function kissBurst(targetEl, amount = 14) {
  const rect = targetEl.getBoundingClientRect();
  for (let i = 0; i < amount; i++) {
    const x = rect.left + rect.width / 2 + (Math.random() * 140 - 70);
    const y = rect.top + rect.height / 2 + (Math.random() * 60 - 30);
    const em = Math.random() > 0.2 ? "😘" : "💋";
    setTimeout(() => popAt(x, y, em), i * 18);
  }
}

// Burst de cœurs plus dense
function heartsBurst(amount = 60) {
  for (let i = 0; i < amount; i++) {
    setTimeout(spawnIcon, i * 18);
  }
}

// --- Musique (optionnel) ---
// iPad/Safari: la musique ne peut démarrer que sur action utilisateur (un clic).
// 👉 Mets ton fichier dans /img/ (ex: img/music.mp3) et décommente les lignes ci-dessous.
let audio = null;
// audio = new Audio("./img/music.mp3");
// audio.loop = true;
// audio.volume = 0.35;

function tryPlayMusic() {
  if (!audio) return;
  audio.play().catch(() => {});
}

// --- Actions boutons ---
yesBtn.addEventListener("click", () => {
  tryPlayMusic();
  setMessage("Je t’aime ❤️ T’es la meilleure chose qui me soit arrivée.");
  pulse(yesBtn);
  kissBurst(yesBtn, 18);
  heartsBurst(80);
});

maybeBtn.addEventListener("click", () => {
  tryPlayMusic();
  setMessage("😢 I’ll wait…");
  wizz(wrap);
  // quelques vibes tristes
  const rect = maybeBtn.getBoundingClientRect();
  for (let i = 0; i < 10; i++) {
    const x = rect.left + rect.width / 2 + (Math.random() * 120 - 60);
    const y = rect.top + rect.height / 2 + (Math.random() * 60 - 30);
    const em = Math.random() > 0.5 ? "💔" : "🥺";
    setTimeout(() => popAt(x, y, em), i * 30);
  }
});

// --- NO qui s’échappe (iPad friendly) ---
function moveNoButton() {
  const padding = 16;
  const maxX = Math.max(0, window.innerWidth - noBtn.offsetWidth - padding);
  const maxY = Math.max(0, window.innerHeight - noBtn.offsetHeight - padding);

  const x = Math.floor(Math.random() * maxX);
  const y = Math.floor(Math.random() * maxY);

  noBtn.style.position = "fixed";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
  noBtn.style.zIndex = "9999";
}

noBtn.addEventListener("pointerdown", (e) => {
  e.preventDefault();
  tryPlayMusic();
  moveNoButton();

  // petit “whoosh” visuel
  const rect = noBtn.getBoundingClientRect();
  popAt(rect.left + rect.width / 2, rect.top + rect.height / 2, "💨");
});

noBtn.addEventListener("mouseenter", moveNoButton); // utile si un jour tu testes sur ordi
