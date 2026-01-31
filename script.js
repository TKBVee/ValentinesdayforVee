const yesBtn = document.getElementById("yesBtn");
const maybeBtn = document.getElementById("maybeBtn");
const noBtn = document.getElementById("noBtn");
const message = document.getElementById("message");
const heartsLayer = document.getElementById("hearts");

function setMessage(text) {
  message.textContent = text;
}

yesBtn.addEventListener("click", () => setMessage("YAY!!! 💘 See you soon 😌"));
maybeBtn.addEventListener("click", () => setMessage("Okay… I’ll wait 🥺👉👈"));

// ✅ iPad-friendly : "No" bouge au tap (pointerdown marche tactile + souris)
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
  moveNoButton();
});

noBtn.addEventListener("click", () => setMessage("Impossible 😤"));

// 💖 Fond animé : cœurs + étoiles qui tombent
const icons = ["💖", "💕", "💘", "❤️", "✨", "⭐️"];
function spawnIcon() {
  const el = document.createElement("span");
  el.className = "fall";
  el.textContent = icons[Math.floor(Math.random() * icons.length)];

  const left = Math.random() * 100;              // %
  const duration = 4 + Math.random() * 5;        // 4–9s
  const size = 16 + Math.random() * 18;          // 16–34px

  el.style.left = `${left}vw`;
  el.style.animationDuration = `${duration}s`;
  el.style.fontSize = `${size}px`;

  heartsLayer.appendChild(el);

  // nettoyage
  setTimeout(() => el.remove(), duration * 1000 + 200);
}

// fréquence : ajuste ici si tu veux + ou - de cœurs
setInterval(spawnIcon, 220);
