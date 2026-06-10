let currentWord = "";
let score = 0;
let streak = 0;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createCloud(word) {
  const cloud = document.getElementById("cloud");
  cloud.innerHTML = "";

  const letters = shuffle([...word]);
  const size = Math.min(cloud.offsetWidth, cloud.offsetHeight, 300);
  const centerX = cloud.offsetWidth / 2;
  const centerY = cloud.offsetHeight / 2;
  const radius = size * 0.35;

  letters.forEach((letter, i) => {
    const div = document.createElement("div");
    div.className = "letter";
    div.textContent = letter;

    const angle = (i * 36) * Math.PI / 180;
    const offset = radius * 0.15;
    const r = radius + (Math.random() * offset - offset / 2);
    const x = centerX + r * Math.cos(angle);
    const y = centerY + r * Math.sin(angle);

    div.style.left = x + "px";
    div.style.top = y + "px";
    div.style.fontSize = size * 0.12 + "px";
    div.style.color = `hsl(${Math.random() * 360},90%,70%)`;
    div.style.transform = "translate(-50%,-50%)";

    cloud.appendChild(div);
  });
}

function updateStats() {
  document.getElementById("score").textContent = score;
  document.getElementById("streak").textContent = streak;
  document.getElementById("length").textContent = currentWord.length;
}

function randomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function newGame() {

  currentWord = randomWord().toUpperCase();

  createCloud(currentWord);

  document.getElementById("guess").value = "";
  document.getElementById("message").textContent = "";
  updateStats();
}

function checkGuess() {

  const guess = document
    .getElementById("guess")
    .value
    .trim()
    .toUpperCase();

  const message = document.getElementById("message");

  if (guess === currentWord) {

    streak++;
    score += 10 + (streak * 2);

    message.textContent = "Richtig!";
    message.className = "correct";

    updateStats();

    setTimeout(newGame, 1500);

  } else {

    streak = 0;

    message.textContent = "Falsch. Versuch es erneut.";
    message.className = "wrong";

    updateStats();
  }
}

function revealWord() {
  document.getElementById("message").textContent = `Das Wort war: ${currentWord}`;
  document.getElementById("message").className = "wrong";
  setTimeout(newGame, 1500);
}

document.getElementById("guess").addEventListener("keydown", e => {
  if (e.key === "Enter") {
    checkGuess();
  }
});

window.addEventListener("load", newGame);
