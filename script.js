const yesBtn = document.getElementById("yesBtn");
const maybeBtn = document.getElementById("maybeBtn");
const noBtn = document.getElementById("noBtn");
const heartsLayer = document.getElementById("hearts");
const overlay = document.getElementById("overlay");

if (!heartsLayer || !overlay || !yesBtn || !maybeBtn || !noBtn) {
  console.warn("Missing elements: check your IDs in index.html");
}

/* --- Fond animé --- */
const icons = ["💖", "💕", "💘", "❤️", "✨", "⭐️"];

function spawnFallingIcon() {
  if (!heartsLayer) return;

  const el = document.createElement("span");
  el.className = "fall";
  el.textContent = icons[Math.floor(Math.random() * icons.length)];

  const duration = 4 + Math.random() * 5; // 4–9s
  const size = 16 + Math.random() * 20;

  el.style.left = `${Math.random() * 100}vw`;
  el.style.animationDuration = `${duration}s`;
  el.style.fontSize = `${size}px`;

  heartsLayer.appendChild(el);

  setTimeout(() => el.remove(), duration * 1000 + 300);
}

setInterval(spawnFallingIcon, 220);

/* --- Overlay message au centre --- */
let hideTimer = null;

function showCenterMessage(htmlText) {
  if (!overlay) return;

  overlay.innerHTML = `<div class="bubble wiggle">${htmlText}</div>`;
  overlay.classList.add("show");

  const bubble = overlay.querySelector(".bubble");
  if (bubble) {
    bubble.classList.remove("wiggle");
    void bubble.offsetWidth;
    bubble.classList.add("wiggle");
  }

  clearTimeout(hideTimer);
  hideTimer = setTimeout(() => overlay.classList.remove("show"), 2600);
}

/* --- Particules (bisous & co) --- */
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

function heartsBurst(amount = 80) {
  for (let i = 0; i < amount; i++) {
    setTimeout(spawnFallingIcon, i * 12);
  }
}

/* --- Actions boutons --- */
yesBtn?.addEventListener("click", () => {
  showCenterMessage("<strong>I’m the luckiest ever 😍✨</strong>");
  kissBurst(80);
  heartsBurst(120);
});

maybeBtn?.addEventListener("click", () => {
  showCenterMessage("<strong>😢 I’ll wait…</strong>");
  for (let i = 0; i < 16; i++) {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const em = Math.random() > 0.5 ? "🥺" : "💔";
    setTimeout(() => popAt(x, y, em), i * 35);
  }
});

/* --- NO qui s’échappe (iPad friendly) --- */
function moveNoButton() {
  if (!noBtn) return;

  const padding = 16;
  const maxX = Math.max(0, window.innerWidth - noBtn.offsetWidth - padding);
  const maxY = Math.max(0, window.innerHeight - noBtn.offsetHeight - padding);

  noBtn.style.position = "fixed";
  noBtn.style.left = `${Math.floor(Math.random() * maxX)}px`;
  noBtn.style.top = `${Math.floor(Math.random() * maxY)}px`;
  noBtn.style.zIndex = "9999";
}

noBtn?.addEventListener("pointerdown", (e) => {
  e.preventDefault();
  moveNoButton();
  popAt(window.innerWidth * 0.5, window.innerHeight * 0.45, "💨");
});

noBtn?.addEventListener("touchstart", (e) => {
  e.preventDefault();
  moveNoButton();
  popAt(window.innerWidth * 0.5, window.innerHeight * 0.45, "💨");
}, { passive: false });

noBtn?.addEventListener("mouseenter", moveNoButton);

noBtn?.addEventListener("click", (e) => {
  e.preventDefault();
  moveNoButton();
});
