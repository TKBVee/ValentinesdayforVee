const yesBtn = document.getElementById("yesBtn");
const maybeBtn = document.getElementById("maybeBtn");
const noBtn = document.getElementById("noBtn");
const message = document.getElementById("message");
const heartsLayer = document.getElementById("hearts");

// ------- Messages -------
function setMessage(text) {
  message.textContent = text;
}

// ------- Background icons (déjà présents) -------
const icons = ["💖", "💕", "💘", "❤️", "✨", "⭐️"];

function spawnIcon() {
  const el = document.createElement("span");
  el.className = "fall";
  el.textContent = icons[Math.floor(Math.random() * icons.length)];

  const left = Math.random() * 100;        // vw
  const duration = 4 + Math.random() * 5;  // 4–9s
  const size = 16 + Math.random() * 20;    // 16–36px

  el.style.left = `${left}vw`;
  el.style.animationDuration = `${duration}s`;
  el.style.fontSize = `${size}px`;

  heartsLayer.appendChild(el);
  setTimeout(() => el.remove(), duration * 1000 + 200);
}

// fond continu (tu peux changer 220 -> 300 si tu veux moins dense)
setInterval(spawnIcon, 220);

// ------- Burst de cœurs (YES) -------
function heartsBurst(amount = 40) {
  for (let i = 0; i < amount; i++) {
    setTimeout(spawnIcon, i * 25);
  }
}

// ------- YES / MAYBE -------
yesBtn.addEventListener("click", () => {
  setMessage("Je t’aime ❤️");
  heartsBurst(70); // gros boost de cœurs au clic
});

maybeBtn.addEventListener("click", () => {
  setMessage("😢 I’ll wait…");
});

// ------- NO qui s’échappe vraiment (iPad friendly) -------
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

// Sur ordi : dès que tu approches
noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("pointerenter", moveNoButton);

// Sur iPad/tactile : dès que tu touches (avant le clic)
noBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
  moveNoButton();
}, { passive: false });

// Si jamais il “réussit” à être cliqué : on le fait fuir quand même
noBtn.addEventListener("click", (e) => {
  e.preventDefault();
  moveNoButton();
});
