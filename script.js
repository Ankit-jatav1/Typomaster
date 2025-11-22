const paragraphs = [
  "Typing practice is important to improve your speed and accuracy.",
  "The quick brown fox jumps over the lazy dog.",
  "Coding is a skill that improves with consistent practice.",
  "React is a powerful JavaScript library for building UIs.",
  "Discipline and consistency are key to becoming a great developer.",
  "Frontend development includes HTML, CSS, and JavaScript.",
  "Every programmer starts by printing Hello World.",
  "Practice daily and see your typing skills improve over time."
];

const display = document.getElementById('text-display');
const input = document.getElementById('text-input');
const timerSpan = document.getElementById('timer');
const wpmSpan = document.getElementById('wpm');
const accuracySpan = document.getElementById('accuracy');
const restartBtn = document.getElementById('restart-btn');

let timer = 60;
let interval;
let isStarted = false;
let sampleText = '';

// 🟢 Load and display a random paragraph
function loadRandomText() {
  const random = paragraphs[Math.floor(Math.random() * paragraphs.length)];
  sampleText = random;
  display.innerHTML = '';

  random.split('').forEach(char => {
    const span = document.createElement('span');
    span.innerText = char;
    display.appendChild(span);
  });
}

// ⏱️ Start the countdown timer
function startTimer() {
  interval = setInterval(() => {
    if (timer > 0) {
      timer--;
      timerSpan.textContent = timer;

      // Update progress bar
      const progress = (timer / 60) * 100;
      document.getElementById('progress-bar').style.width = `${progress}%`;

    } else {   
      clearInterval(interval);
      input.disabled = true;
      showSummary();
    }
  }, 1000);
}

// 📊 Update WPM and accuracy on every input
input.addEventListener('input', () => {
  const sound = document.getElementById("type-sound");
  sound.currentTime = 0;
sound.play();

  const inputChars = input.value.split('');
  const spans = display.querySelectorAll('span');
  let correctChars = 0;

  if (!isStarted) {
    isStarted = true;
    startTimer();
  }

  spans.forEach((span, index) => {
    const char = inputChars[index];

    if (char == null) {
      span.classList.remove('correct', 'incorrect');
    } else if (char === span.innerText) {
      span.classList.add('correct');
      span.classList.remove('incorrect');
      correctChars++;
    } else {
      span.classList.add('incorrect');
      span.classList.remove('correct');
    }
  });

  const accuracy = Math.round((correctChars / inputChars.length) * 100) || 0;
  const words = input.value.trim().split(/\s+/).length;
  const elapsed = 60 - timer;
  const wpm = elapsed > 0 ? Math.round((words / elapsed) * 60) : 0;

  accuracySpan.textContent = accuracy;
  wpmSpan.textContent = wpm;
});

// 🔁 Restart typing session
restartBtn.addEventListener('click', () => {
  input.value = '';
  timer = 60;
  timerSpan.textContent = 60;
  accuracySpan.textContent = 0;
  wpmSpan.textContent = 0;
  input.disabled = false;
  clearInterval(interval);
  isStarted = false;

  const spans = display.querySelectorAll('span');
  spans.forEach(span => span.classList.remove('correct', 'incorrect'));

  loadRandomText();
  document.getElementById('progress-bar').style.width = '100%';
  
});

// 📦 Load on page load
window.onload = loadRandomText;

document.getElementById("dark-mode-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");

  const isDark = document.body.classList.contains("dark");
  document.getElementById("dark-mode-toggle").textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
});

function showSummary() {
  document.getElementById("summary-modal").style.display = "flex";
  document.getElementById("final-wpm").textContent = wpmSpan.textContent;
  document.getElementById("final-accuracy").textContent = accuracySpan.textContent;
}

function closeModal() {
  document.getElementById("summary-modal").style.display = "none";
}


