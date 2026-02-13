const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const message = document.getElementById("message");

yesBtn.addEventListener("click", () => {
  message.textContent = "Yesss! C'est le meilleur oui du monde. ❤️";
});

noBtn.addEventListener("click", () => {
  message.textContent = "Hmmm... on est vraiment sûr de ce \"Non\" ? 😏";
  yesBtn.style.transform = "scale(1.08)";
  setTimeout(() => {
    yesBtn.style.transform = "";
  }, 220);
});
