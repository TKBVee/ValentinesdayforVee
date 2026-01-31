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

noBtn.addEventListener("mouseenter", () => {
  const maxX = window.innerWidth - noBtn.offsetWidth - 20;
  const maxY = window.innerHeight - noBtn.offsetHeight - 20;

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  noBtn.style.position = "fixed";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
});

noBtn.addEventListener("click", () => {
  setMessage("Impossible 😤");
});
