const yesBtn = document.getElementById("yesBtn");
const maybeBtn = document.getElementById("maybeBtn");
const noBtn = document.getElementById("noBtn");
const message = document.getElementById("message");

function setMessage(text) {
  message.textContent = text;
}

yesBtn.addEventListener("click", () => {
  setMessage("YAY!!! 💘 See you soon 😌");
});

maybeBtn.addEventListener("click", () => {
  setMessage("Okay… I’ll wait 🥺👉👈");
});

// Fonction qui déplace le bouton "No"
function moveNoButton() {
  const maxX = window.innerWidth - noBtn.offsetWidth - 20;
  const maxY = window.innerHeight - noBtn.offsetHeight - 20;

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  noBtn.style.position = "fixed";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

// ✅ iPad / mobile : bouge au toucher
noBtn.addEventListener("touchstart", (e) => {
  e.preventDefault(); // évite le "clic" classique
  moveNoButton();
});

// ✅ Ordi : bouge au survol (si un jour tu testes sur laptop)
noBtn.addEventListener("mouseenter", () => {
  moveNoButton();
});

// Si jamais il arrive à cliquer (rare 😅)
noBtn.addEventListener("click", () => {
  setMessage("Impossible 😤");
});
