/* =============================================
   DYNAMIC QUIZ – JAVASCRIPT
   ============================================= */

// ===========================
// QUESTION & ANSWER VARIABLES
// ===========================

// Question 1
const question1 = "What does HTML stand for?";
const answer1 = "HyperText Markup Language";

// Question 2
const question2 = "Which CSS property is used to change the text color?";
const answer2 = "color";

// Question 3
const question3 = "Inside which HTML element do we put JavaScript?";
const answer3 = "<script>";

// Question 4
const question4 = "What does CSS stand for?";
const answer4 = "Cascading Style Sheets";

// Question 5
const question5 = "Which company developed JavaScript?";
const answer5 = "Netscape";

// Options stored separately
const options1 = ["HyperText Markup Language", "Home Tool Markup Language", "Hyperlinks Text Mark Language", "Hyper Transfer Markup Language"];
const options2 = ["font-color", "text-color", "color", "foreground-color"];
const options3 = ["<javascript>", "<js>", "<script>", "<code>"];
const options4 = ["Cascading Style Sheets", "Creative Style System", "Computer Style Sheets", "Colorful Style Sheets"];
const options5 = ["Microsoft", "Google", "Netscape", "Apple"];

// Collect into arrays for rendering
const questions = [question1, question2, question3, question4, question5];
const answers = [answer1, answer2, answer3, answer4, answer5];
const allOptions = [options1, options2, options3, options4, options5];

// ===========================
// BUILD QUIZ IN THE DOM
// ===========================

const quizBody = document.getElementById("quizBody");
const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");
const totalQuestionsEl = document.getElementById("totalQuestions");

totalQuestionsEl.textContent = questions.length;

function buildQuiz() {
  quizBody.innerHTML = "";

  for (let i = 0; i < questions.length; i++) {
    const card = document.createElement("div");
    card.className = "question-card";
    card.id = "qCard" + i;

    let optionsHTML = "";
    for (let j = 0; j < allOptions[i].length; j++) {
      // Escape angle brackets for display
      const displayText = allOptions[i][j].replace(/</g, "&lt;").replace(/>/g, "&gt;");

      optionsHTML += `
        <label class="option-label" id="opt${i}_${j}">
          <input type="radio" name="q${i}" value="${allOptions[i][j]}" onchange="updateProgress()">
          <span class="option-circle"><i class="bi bi-check-lg"></i></span>
          <span class="option-text">${displayText}</span>
        </label>`;
    }

    card.innerHTML = `
      <span class="question-number">Question ${i + 1} of ${questions.length}</span>
      <p class="question-text">${questions[i].replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
      <div class="options-group">
        ${optionsHTML}
      </div>
      <div class="answer-feedback" id="feedback${i}"></div>
    `;

    quizBody.appendChild(card);
  }
}

// ===========================
// UPDATE PROGRESS BAR
// ===========================

function updateProgress() {
  let answered = 0;
  for (let i = 0; i < questions.length; i++) {
    const selected = document.querySelector(`input[name="q${i}"]:checked`);
    if (selected) answered++;
  }
  const percent = Math.round((answered / questions.length) * 100);
  progressFill.style.width = percent + "%";
  progressText.textContent = answered + " / " + questions.length + " answered";
}

// ===========================
// CHECK INDIVIDUAL ANSWERS
// ===========================

function checkAnswer1() {
  return checkSingleAnswer(0);
}

function checkAnswer2() {
  return checkSingleAnswer(1);
}

function checkAnswer3() {
  return checkSingleAnswer(2);
}

function checkAnswer4() {
  return checkSingleAnswer(3);
}

function checkAnswer5() {
  return checkSingleAnswer(4);
}

function checkSingleAnswer(index) {
  const selected = document.querySelector(`input[name="q${index}"]:checked`);
  if (!selected) return 0;

  const card = document.getElementById("qCard" + index);
  const feedback = document.getElementById("feedback" + index);
  const correctAnswer = answers[index];
  const isCorrect = selected.value === correctAnswer;

  // Highlight the correct and wrong options
  const labels = card.querySelectorAll(".option-label");
  labels.forEach(function (label) {
    const radio = label.querySelector("input");
    label.style.pointerEvents = "none"; // disable further changes

    if (radio.value === correctAnswer) {
      label.classList.add("correct-answer");
    } else if (radio.checked && radio.value !== correctAnswer) {
      label.classList.add("wrong-answer");
    }
  });

  // Card border highlight
  if (isCorrect) {
    card.classList.add("correct");
    feedback.className = "answer-feedback show correct";
    feedback.innerHTML = '<i class="bi bi-check-circle-fill"></i> Correct! Well done.';
  } else {
    card.classList.add("wrong");
    feedback.className = "answer-feedback show wrong";
    const safeAnswer = correctAnswer.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    feedback.innerHTML = '<i class="bi bi-x-circle-fill"></i> Incorrect. The correct answer is: <strong>' + safeAnswer + "</strong>";
  }

  return isCorrect ? 1 : 0;
}

// ===========================
// CALCULATE TOTAL SCORE
// ===========================

function calculateScore() {
  let total = 0;
  total += checkAnswer1();
  total += checkAnswer2();
  total += checkAnswer3();
  total += checkAnswer4();
  total += checkAnswer5();
  return total;
}

// ===========================
// DISPLAY RESULTS
// ===========================

function displayResults(score) {
  const resultSection = document.getElementById("resultSection");
  const resultCircle = document.getElementById("resultCircle");
  const scoreValue = document.getElementById("scoreValue");
  const resultMessage = document.getElementById("resultMessage");
  const resultDetail = document.getElementById("resultDetail");

  scoreValue.textContent = score + "/" + questions.length;

  // Remove old classes
  resultCircle.className = "result-circle";

  let message = "";
  let detail = "";
  let gradeClass = "";

  const percentage = (score / questions.length) * 100;

  // Conditional statements based on score
  if (percentage === 100) {
    message = "🎉 Outstanding! Perfect Score!";
    detail = "You answered all questions correctly. You have excellent knowledge of web development fundamentals!";
    gradeClass = "excellent";
  } else if (percentage >= 60) {
    message = "👍 Good Job!";
    detail = "You have a solid understanding. Review the incorrect questions and you'll master these topics in no time.";
    gradeClass = "good";
  } else if (percentage >= 40) {
    message = "📚 Keep Practicing!";
    detail = "You got some right, but there's room for improvement. Study the basics and try again!";
    gradeClass = "average";
  } else {
    message = "💪 Don't Give Up!";
    detail = "It looks like you need to review the fundamentals. Go through the material and come back stronger!";
    gradeClass = "poor";
  }

  resultCircle.classList.add(gradeClass);
  resultMessage.textContent = message;
  resultDetail.textContent = detail;
  resultSection.classList.add("show");

  // Disable submit, enable only reset
  document.getElementById("btnSubmit").disabled = true;
}

// ===========================
// SUBMIT QUIZ
// ===========================

document.getElementById("btnSubmit").addEventListener("click", function () {
  // Check if all questions are answered
  let allAnswered = true;
  for (let i = 0; i < questions.length; i++) {
    const selected = document.querySelector(`input[name="q${i}"]:checked`);
    if (!selected) {
      allAnswered = false;
      // Highlight unanswered card
      const card = document.getElementById("qCard" + i);
      card.style.boxShadow = "0 0 0 3px rgba(214, 48, 49, 0.3)";
      setTimeout(function () {
        card.style.boxShadow = "none";
      }, 2000);
    }
  }

  if (!allAnswered) {
    alert("Please answer all questions before submitting.");
    return;
  }

  const score = calculateScore();
  displayResults(score);

  // Fill progress bar fully
  progressFill.style.width = "100%";
  progressText.textContent = "Quiz Completed!";

  // Scroll to results
  document.getElementById("resultSection").scrollIntoView({ behavior: "smooth", block: "center" });
});

// ===========================
// RESET QUIZ
// ===========================

document.getElementById("btnReset").addEventListener("click", function () {
  // Clear all radio selections
  const radios = document.querySelectorAll('input[type="radio"]');
  radios.forEach(function (radio) {
    radio.checked = false;
  });

  // Remove all visual feedback
  const labels = document.querySelectorAll(".option-label");
  labels.forEach(function (label) {
    label.classList.remove("correct-answer", "wrong-answer");
    label.style.pointerEvents = "auto";
  });

  const cards = document.querySelectorAll(".question-card");
  cards.forEach(function (card) {
    card.classList.remove("correct", "wrong");
    card.style.boxShadow = "none";
  });

  const feedbacks = document.querySelectorAll(".answer-feedback");
  feedbacks.forEach(function (fb) {
    fb.className = "answer-feedback";
    fb.innerHTML = "";
  });

  // Hide results
  const resultSection = document.getElementById("resultSection");
  resultSection.classList.remove("show");

  // Reset progress bar
  progressFill.style.width = "0%";
  progressText.textContent = "0 / " + questions.length + " answered";

  // Re-enable submit button
  document.getElementById("btnSubmit").disabled = false;

  // Scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ===========================
// INITIALIZE
// ===========================
buildQuiz();
