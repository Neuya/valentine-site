const REQUIRED_SURE_YES_CLICKS = 5;

const screens = {
  step1: document.getElementById("step1"),
  stepNo: document.getElementById("stepNo"),
  stepYes: document.getElementById("stepYes"),
  step2: document.getElementById("step2"),
  stepSlay: document.getElementById("stepSlay"),
  stepAfterAriana: document.getElementById("stepAfterAriana"),
  stepSure: document.getElementById("stepSure"),
  stepChorizo: document.getElementById("stepChorizo"),
  stepFinalConfirm: document.getElementById("stepFinalConfirm"),
  stepLoveFinal: document.getElementById("stepLoveFinal"),
  stepWd40: document.getElementById("stepWd40"),
  stepWitch: document.getElementById("stepWitch"),
};

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const backBtn = document.getElementById("backBtn");
const continueBtn = document.getElementById("continueBtn");
const continueArianaBtn = document.getElementById("continueArianaBtn");
const continueChorizoBtn = document.getElementById("continueChorizoBtn");
const louisImage = document.getElementById("louisImage");
const yesStep2Btn = document.getElementById("yesStep2Btn");
const noEscapeBtn = document.getElementById("noEscapeBtn");
const escapeArea = document.getElementById("escapeArea");
const arianaImage = document.getElementById("arianaImage");
const yesAfterArianaBtn = document.getElementById("yesAfterArianaBtn");
const noAfterArianaBtn = document.getElementById("noAfterArianaBtn");
const yesSureBtn = document.getElementById("yesSureBtn");
const noSureBtn = document.getElementById("noSureBtn");
const sureFrame = document.getElementById("sureFrame");
const stepSure = document.getElementById("stepSure");
const emojiCanvas = document.getElementById("emojiCanvas");
const yesFinalBtn = document.getElementById("yesFinalBtn");
const noFinalBtn = document.getElementById("noFinalBtn");
const backToStartFromLoveBtn = document.getElementById("backToStartFromLoveBtn");
const backFromWd40Btn = document.getElementById("backFromWd40Btn");
const backFromWitchBtn = document.getElementById("backFromWitchBtn");
const witchImage = document.getElementById("witchImage");
const chorizoImage = document.getElementById("chorizoImage");
const wd40Image = document.getElementById("wd40Image");
const patinImage = document.getElementById("patinImage");

let sureYesClicks = 0;
let sureGrowClicks = 0;
let sureNoClicks = 0;

function showScreen(name) {
  Object.entries(screens).forEach(([key, element]) => {
    const isActive = key === name;
    element.dataset.active = isActive ? "true" : "false";
    element.setAttribute("aria-hidden", isActive ? "false" : "true");
  });

  if (name === "step2") {
    resetEscapeButton();
  }

  if (name === "stepSure") {
    resetSureStep();
  }
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function resetEscapeButton() {
  noEscapeBtn.style.left = "50%";
  noEscapeBtn.style.top = "72%";
  noEscapeBtn.style.transform = "translate(-50%, -50%)";
}

function teleportEscapeButton(pointerX, pointerY) {
  const areaRect = escapeArea.getBoundingClientRect();
  const btnRect = noEscapeBtn.getBoundingClientRect();

  const localX = pointerX - areaRect.left;
  const localY = pointerY - areaRect.top;

  const minX = btnRect.width / 2;
  const maxX = areaRect.width - btnRect.width / 2;
  const minY = btnRect.height / 2;
  const maxY = areaRect.height - btnRect.height / 2;

  const oppositeX = localX < areaRect.width / 2 ? maxX : minX;
  const oppositeY = localY < areaRect.height / 2 ? maxY : minY;

  const jitterX = (Math.random() - 0.5) * areaRect.width * 0.22;
  const jitterY = (Math.random() - 0.5) * areaRect.height * 0.22;

  const nextX = clamp(oppositeX + jitterX, minX, maxX);
  const nextY = clamp(oppositeY + jitterY, minY, maxY);

  noEscapeBtn.style.left = `${nextX}px`;
  noEscapeBtn.style.top = `${nextY}px`;
  noEscapeBtn.style.transform = "translate(-50%, -50%)";
}

function clearSureEmojis() {
  emojiCanvas.innerHTML = "";
}

function resetSureStep() {
  sureYesClicks = 0;
  sureGrowClicks = 0;
  sureNoClicks = 0;
  yesSureBtn.style.transform = "";
  noSureBtn.style.transform = "";
  noSureBtn.style.opacity = "1";
  noSureBtn.style.pointerEvents = "auto";
  clearSureEmojis();
}

function getRandomEmojiPosition() {
  const sectionRect = stepSure.getBoundingClientRect();
  const frameRect = sureFrame.getBoundingClientRect();

  const margin = 28;
  const maxAttempts = 40;

  for (let i = 0; i < maxAttempts; i += 1) {
    const x = margin + Math.random() * (sectionRect.width - margin * 2);
    const y = margin + Math.random() * (sectionRect.height - margin * 2);

    const xInFrame = x > frameRect.left - sectionRect.left - margin && x < frameRect.right - sectionRect.left + margin;
    const yInFrame = y > frameRect.top - sectionRect.top - margin && y < frameRect.bottom - sectionRect.top + margin;

    if (!(xInFrame && yInFrame)) {
      return { x, y };
    }
  }

  return { x: margin, y: margin };
}

function spawnSureEmoji(char) {
  const { x, y } = getRandomEmojiPosition();
  const node = document.createElement("span");
  node.className = "sure-emoji";
  node.textContent = char;
  node.style.left = `${x}px`;
  node.style.top = `${y}px`;
  node.style.fontSize = `${2.2 + Math.random() * 1.2}rem`;

  emojiCanvas.appendChild(node);
}

louisImage.addEventListener("error", () => {
  louisImage.src = "images/louis.jpg";
});

arianaImage.addEventListener("error", () => {
  arianaImage.src = "images/Ariana-Grande.jpg";
});

witchImage.addEventListener("error", () => {
  witchImage.src = "images/sorciere.jpg";
});

chorizoImage.addEventListener("error", () => {
  chorizoImage.src = "images/chorizo.jpg";
});

wd40Image.addEventListener("error", () => {
  wd40Image.src = "images/wd40.jpg";
});

patinImage.addEventListener("error", () => {
  patinImage.src = "images/patin.png";
});

yesBtn.addEventListener("click", () => {
  showScreen("stepYes");
});

noBtn.addEventListener("click", () => {
  showScreen("stepNo");
});

backBtn.addEventListener("click", () => {
  showScreen("step1");
});

continueBtn.addEventListener("click", () => {
  showScreen("step2");
});

continueArianaBtn.addEventListener("click", () => {
  showScreen("stepAfterAriana");
});

continueChorizoBtn.addEventListener("click", () => {
  showScreen("stepFinalConfirm");
});

yesAfterArianaBtn.addEventListener("click", () => {
  showScreen("stepSure");
});

noAfterArianaBtn.addEventListener("click", () => {
  showScreen("stepWitch");
});

yesSureBtn.addEventListener("click", () => {
  spawnSureEmoji("🥰");
  sureYesClicks += 1;
  sureGrowClicks += 1;
  yesSureBtn.style.transform = `scale(${1 + sureGrowClicks * 0.14})`;

  if (sureYesClicks >= REQUIRED_SURE_YES_CLICKS) {
    showScreen("stepChorizo");
  }
});

noSureBtn.addEventListener("click", () => {
  spawnSureEmoji("😒");
  sureGrowClicks += 1;
  sureNoClicks += 1;
  yesSureBtn.style.transform = `scale(${1 + sureGrowClicks * 0.14})`;

  const remainingRatio = Math.max((REQUIRED_SURE_YES_CLICKS - sureNoClicks) / REQUIRED_SURE_YES_CLICKS, 0);
  const noScale = Math.max(remainingRatio, 0.01);
  noSureBtn.style.transform = `scale(${noScale})`;
  noSureBtn.style.opacity = `${Math.max(remainingRatio, 0)}`;

  if (sureNoClicks >= REQUIRED_SURE_YES_CLICKS) {
    noSureBtn.style.opacity = "0";
    noSureBtn.style.pointerEvents = "none";
  }
});

yesFinalBtn.addEventListener("click", () => {
  showScreen("stepLoveFinal");
});

noFinalBtn.addEventListener("click", () => {
  showScreen("stepWd40");
});

backToStartFromLoveBtn.addEventListener("click", () => {
  showScreen("step1");
});

backFromWd40Btn.addEventListener("click", () => {
  showScreen("step1");
});

backFromWitchBtn.addEventListener("click", () => {
  showScreen("step1");
});

yesStep2Btn.addEventListener("click", () => {
  showScreen("stepSlay");
});

noEscapeBtn.addEventListener("mouseenter", (event) => {
  teleportEscapeButton(event.clientX, event.clientY);
});

escapeArea.addEventListener("mousemove", (event) => {
  if (screens.step2.dataset.active !== "true") {
    return;
  }

  const noRect = noEscapeBtn.getBoundingClientRect();
  const centerX = noRect.left + noRect.width / 2;
  const centerY = noRect.top + noRect.height / 2;
  const distance = Math.hypot(event.clientX - centerX, event.clientY - centerY);
  const threshold = 260;

  if (distance < threshold) {
    teleportEscapeButton(event.clientX, event.clientY);
  }
});

escapeArea.addEventListener(
  "touchstart",
  (event) => {
    if (screens.step2.dataset.active !== "true") {
      return;
    }

    const touch = event.touches[0];
    if (!touch) {
      return;
    }

    teleportEscapeButton(touch.clientX, touch.clientY);
  },
  { passive: true }
);

resetEscapeButton();
resetSureStep();
