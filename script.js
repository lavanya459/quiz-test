// ------------------- TIME CONTROL -------------------
const startTime = new Date();
startTime.setHours(23, 0, 0);  // 11:00 PM
const endTime = new Date();
endTime.setHours(23, 30, 0);   // 11:30 PM

const timeStatus = document.getElementById("time-status");
const quizSection = document.getElementById("quiz-section");

function checkTime() {
  const now = new Date();
  if (now < startTime) {
    quizSection.style.display = "none";
    timeStatus.textContent = "⏳ Test will start at 11:00 PM.";
  } else if (now >= startTime && now <= endTime) {
    quizSection.style.display = "block";
    const remaining = Math.floor((endTime - now) / 1000 / 60);
    timeStatus.textContent = `🕒 Test in progress | Ends in ${remaining} mins`;
  } else {
    quizSection.style.display = "none";
    timeStatus.textContent = "❌ Test closed. You cannot access it after 11:30 PM.";
  }
}
setInterval(checkTime, 1000);
checkTime();

// ------------------- QUESTIONS -------------------
const questions = [
  // SPEED & DISTANCE (10)
  {
    question: "A car travels 150 km in 3 hours. Find its speed.",
    options: ["40 km/hr", "50 km/hr", "60 km/hr", "70 km/hr"],
    answer: "50 km/hr"
  },
  {
    question: "A train 180 m long passes a pole in 12 sec. Find its speed.",
    options: ["45 km/hr", "50 km/hr", "54 km/hr", "60 km/hr"],
    answer: "54 km/hr"
  },
  {
    question: "A person walks at 5 km/hr. How long will he take to cover 2.5 km?",
    options: ["15 min", "20 min", "25 min", "30 min"],
    answer: "30 min"
  },
  {
    question: "A train 300 m long crosses a platform 700 m in 1 min. Speed?",
    options: ["60 km/hr", "72 km/hr", "80 km/hr", "90 km/hr"],
    answer: "60 km/hr"
  },
  {
    question: "A bike covers 120 km in 2 hours. What is its speed in m/s?",
    options: ["12 m/s", "16.6 m/s", "18.5 m/s", "20 m/s"],
    answer: "16.6 m/s"
  },
  {
    question: "Two trains running in opposite directions cross each other in 10s. Their speeds are 54 km/hr and 36 km/hr. If one train is 120m long, find length of other.",
    options: ["100 m", "110 m", "120 m", "130 m"],
    answer: "110 m"
  },
  {
    question: "A bus moving at 72 km/hr crosses a man walking at 6 km/hr in 8 seconds. Find length of the bus.",
    options: ["120 m", "140 m", "150 m", "160 m"],
    answer: "150 m"
  },
  {
    question: "A cyclist covers a distance of 45 km in 3 hours. Find speed in m/s.",
    options: ["3.5", "4.0", "4.1", "4.2"],
    answer: "4.1"
  },
  {
    question: "If a car increases its speed from 40 to 60 km/hr, how much time saved for 120 km?",
    options: ["20 min", "30 min", "40 min", "45 min"],
    answer: "40 min"
  },
  {
    question: "A man runs at 10 km/hr. How much time to cover 500 m?",
    options: ["1.5 min", "2 min", "3 min", "4 min"],
    answer: "3 min"
  },

  // TIME & WORK (10)
  {
    question: "A can do a job in 10 days, B in 15 days. Together they take?",
    options: ["5 days", "6 days", "7 days", "8 days"],
    answer: "6 days"
  },
  {
    question: "A and B can complete a work in 8 days. B alone takes 12 days. A alone can do it in?",
    options: ["18 days", "20 days", "24 days", "32 days"],
    answer: "24 days"
  },
  {
    question: "A is twice as efficient as B. Together they finish work in 12 days. In how many days A alone can finish?",
    options: ["16 days", "18 days", "20 days", "24 days"],
    answer: "18 days"
  },
  {
    question: "A, B, and C can finish a work in 10, 15, and 30 days. In how many days will they finish together?",
    options: ["5 days", "6 days", "7.5 days", "8 days"],
    answer: "5 days"
  },
  {
    question: "A can do work in 5 days, B can do it in 10 days. B helped for 2 days, then A finished. Total time?",
    options: ["3 days", "3.5 days", "4 days", "4.5 days"],
    answer: "3 days"
  },
  {
    question: "A and B together do work in 12 days. A alone 18 days. B alone?",
    options: ["24 days", "27 days", "36 days", "40 days"],
    answer: "36 days"
  },
  {
    question: "A can do 1/3 of a work in 5 days. He takes ___ days to finish it.",
    options: ["10", "12", "15", "18"],
    answer: "15"
  },
  {
    question: "A and B can complete work in 10 days. A alone can do it in 15 days. B alone will take?",
    options: ["20 days", "25 days", "30 days", "40 days"],
    answer: "30 days"
  },
  {
    question: "A, B, C can do work in 20, 30, and 60 days respectively. How long together?",
    options: ["10 days", "12 days", "15 days", "18 days"],
    answer: "10 days"
  },
  {
    question: "A can do a work in 12 days, B in 16 days. They work together for 4 days. Remaining work fraction?",
    options: ["1/3", "3/4", "5/12", "7/12"],
    answer: "5/12"
  }
];

let current = 0;
let score = 0;

const qEl = document.getElementById("question");
const optEl = document.getElementById("options");
const feedEl = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");

function loadQuestion() {
  feedEl.textContent = "";
  nextBtn.style.display = "none";
  const q = questions[current];
  qEl.textContent = `${current + 1}. ${q.question}`;
  optEl.innerHTML = "";
  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(btn, q.answer);
    optEl.appendChild(btn);
  });
}

function checkAnswer(btn, ans) {
  const all = document.querySelectorAll("#options button");
  all.forEach(b => b.disabled = true);

  if (btn.textContent === ans) {
    btn.classList.add("correct");
    feedEl.textContent = "✅ Correct!";
    score++;
  } else {
    btn.classList.add("wrong");
    feedEl.textContent = `❌ Wrong! Correct answer: ${ans}`;
  }

  nextBtn.style.display = "inline-block";
}

nextBtn.onclick = () => {
  current++;
  if (current < questions.length) loadQuestion();
  else showResult();
};

function showResult() {
  qEl.textContent = "🎯 Test Completed!";
  optEl.innerHTML = "";
  feedEl.textContent = "";
  resultEl.textContent = `Your Score: ${score} / ${questions.length}`;
  nextBtn.textContent = "Restart 🔁";
  nextBtn.onclick = restartQuiz;
}

function restartQuiz() {
  current = 0;
  score = 0;
  nextBtn.textContent = "Next ➡️";
  loadQuestion();
  resultEl.textContent = "";
}

loadQuestion();
