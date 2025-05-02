const questions = [
  {
    question:
      "Speed is a scalar quantity. What is the corresponding vector quantity?",
    answer: [
      { text: "Momentum", correct: false },
      { text: "Acceleration", correct: false },
      { text: "Velocity", correct: true },
      { text: "Displacement", correct: false },
    ],
  },
  {
    question: "What device is used to measure electric current?",
    answer: [
      { text: "Voltmeter", correct: false },
      { text: "Ammeter", correct: true },
      { text: "Barometer", correct: false },
      { text: "Thermometer", correct: false },
    ],
  },
  {
    question: "What is the speed of light in a vacuum?",
    answer: [
      { text: "3,000 km/s", correct: false },
      { text: "30,000 km/s", correct: false },
      { text: "300,000 km/s", correct: true },
      { text: "3,000,000 km/s", correct: false },
    ],
  },
  {
    question:
      "What happens to the resistance of a conductor as its temperature increases?",
    answer: [
      { text: "Decreases", correct: false },
      { text: "Remains the same", correct: false },
      { text: "Increases", correct: true },
      { text: "Becomes zero", correct: false },
    ],
  },
  {
    question:
      "Which fundamental force is responsible for holding electrons around the nucleus?",
    answer: [
      { text: "Gravitational Force", correct: false },
      { text: "Electromagnetic Force", correct: true },
      { text: "Strong Nuclear Force", correct: false },
      { text: "Weak Nuclear Force", correct: false },
    ],
  },
  {
    question:
      "Which phenomenon causes a straw to appear bent in a glass of water?",
    answer: [
      { text: "Reflection", correct: false },
      { text: "Refraction", correct: true },
      { text: "Diffraction", correct: false },
      { text: "Dispersion", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerText = `${questionNo}. ${currentQuestion.question}`;

  currentQuestion.answer.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = "true";
    }
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";

  if (isCorrect) {
    selectedBtn.style.backgroundColor = "#16a34a"; // green
    score++;
  } else {
    selectedBtn.style.backgroundColor = "#dc2626"; // red
  }

  // Highlight all correct answers
  Array.from(answerButtons.children).forEach((button) => {
    button.disabled = true;
    if (button.dataset.correct === "true") {
      button.style.backgroundColor = "#16a34a";
    }
  });

  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerText = `🎉 You scored ${score} out of ${questions.length}!`;
  nextButton.innerText = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
