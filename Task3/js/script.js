/* =============================================
   INTERACTIVE CALCULATOR – JAVASCRIPT
   ============================================= */

// ===========================
// DOM ELEMENT REFERENCES
// ===========================
const num1Input = document.getElementById("num1");
const num2Input = document.getElementById("num2");
const operationSelect = document.getElementById("operation");
const opSymbolEl = document.getElementById("opSymbol");
const btnCalculate = document.getElementById("btnCalculate");
const btnClear = document.getElementById("btnClear");
const resultBox = document.getElementById("resultBox");
const resultExpression = document.getElementById("resultExpression");
const resultValue = document.getElementById("resultValue");
const error1 = document.getElementById("error1");
const error2 = document.getElementById("error2");
const historyList = document.getElementById("historyList");
const historySection = document.getElementById("historySection");

// ===========================
// UPDATE OPERATION SYMBOL
// ===========================
operationSelect.addEventListener("change", function () {
  const symbols = {
    add: "+",
    subtract: "−",
    multiply: "×",
    divide: "÷",
    power: "^",
    modulus: "%",
  };
  opSymbolEl.textContent = symbols[this.value] || "?";
});

// ===========================
// CALCULATE FUNCTION
// ===========================
function calculateResult(a, b, operation) {
  let result;

  if (operation === "add") {
    result = a + b;
  } else if (operation === "subtract") {
    result = a - b;
  } else if (operation === "multiply") {
    result = a * b;
  } else if (operation === "divide") {
    // Validate: prevent division by zero
    if (b === 0) {
      return { error: true, message: "Cannot divide by zero!" };
    }
    result = a / b;
  } else if (operation === "power") {
    result = Math.pow(a, b);
  } else if (operation === "modulus") {
    if (b === 0) {
      return { error: true, message: "Cannot take modulus by zero!" };
    }
    result = a % b;
  } else {
    return { error: true, message: "Invalid operation selected." };
  }

  // Round to avoid floating point weirdness
  result = Math.round(result * 1000000) / 1000000;

  return { error: false, value: result };
}

// ===========================
// VALIDATE INPUT
// ===========================
function validateInputs() {
  let valid = true;

  // Clear previous errors
  num1Input.classList.remove("error");
  num2Input.classList.remove("error");
  error1.textContent = "";
  error2.textContent = "";

  const val1 = num1Input.value.trim();
  const val2 = num2Input.value.trim();

  if (val1 === "") {
    num1Input.classList.add("error");
    error1.textContent = "Please enter a number.";
    valid = false;
  } else if (isNaN(val1)) {
    num1Input.classList.add("error");
    error1.textContent = "Must be a valid number.";
    valid = false;
  }

  if (val2 === "") {
    num2Input.classList.add("error");
    error2.textContent = "Please enter a number.";
    valid = false;
  } else if (isNaN(val2)) {
    num2Input.classList.add("error");
    error2.textContent = "Must be a valid number.";
    valid = false;
  }

  return valid;
}

// ===========================
// DISPLAY RESULT IN DOM
// ===========================
function displayResult(a, b, operation, calcResult) {
  const symbols = {
    add: "+",
    subtract: "−",
    multiply: "×",
    divide: "÷",
    power: "^",
    modulus: "%",
  };
  const symbol = symbols[operation];

  // Remove all state classes
  resultBox.className = "result-box show";

  if (calcResult.error) {
    // Division by zero or invalid operation
    resultBox.classList.add("error-result");
    resultExpression.textContent = a + " " + symbol + " " + b;
    resultValue.textContent = calcResult.message;
  } else {
    const value = calcResult.value;
    resultExpression.textContent = a + " " + symbol + " " + b + " =";

    // Format display
    if (Number.isInteger(value)) {
      resultValue.textContent = value;
    } else {
      resultValue.textContent = value;
    }

    // Change background color based on positive or negative
    if (value > 0) {
      resultBox.classList.add("positive");
    } else if (value < 0) {
      resultBox.classList.add("negative");
    } else {
      resultBox.classList.add("zero");
    }

    // Add to history
    addHistory(a + " " + symbol + " " + b, value);
  }
}

// ===========================
// HISTORY
// ===========================
let history = [];

function addHistory(expression, result) {
  history.unshift({ expression: expression, result: result });

  // Keep max 10 entries
  if (history.length > 10) {
    history.pop();
  }

  renderHistory();
}

function renderHistory() {
  if (history.length === 0) {
    historySection.style.display = "none";
    return;
  }

  historySection.style.display = "block";
  historyList.innerHTML = "";

  for (let i = 0; i < history.length; i++) {
    const item = document.createElement("div");
    item.className = "history-item";

    let resClass = "";
    if (history[i].result > 0) {
      resClass = "pos";
    } else if (history[i].result < 0) {
      resClass = "neg";
    }

    item.innerHTML =
      '<span class="expr">' + history[i].expression + '</span>' +
      '<span class="res ' + resClass + '">= ' + history[i].result + "</span>";

    historyList.appendChild(item);
  }
}

// ===========================
// EVENT: CALCULATE
// ===========================
btnCalculate.addEventListener("click", function () {
  if (!validateInputs()) return;

  const a = parseFloat(num1Input.value.trim());
  const b = parseFloat(num2Input.value.trim());
  const operation = operationSelect.value;

  const result = calculateResult(a, b, operation);
  displayResult(a, b, operation, result);
});

// Also calculate on Enter key
document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    btnCalculate.click();
  }
});

// ===========================
// EVENT: CLEAR
// ===========================
btnClear.addEventListener("click", function () {
  // Clear inputs
  num1Input.value = "";
  num2Input.value = "";
  operationSelect.value = "add";
  opSymbolEl.textContent = "+";

  // Clear errors
  num1Input.classList.remove("error");
  num2Input.classList.remove("error");
  error1.textContent = "";
  error2.textContent = "";

  // Hide result
  resultBox.className = "result-box";
  resultExpression.textContent = "";
  resultValue.textContent = "";

  // Clear history
  history = [];
  renderHistory();

  // Focus first input
  num1Input.focus();
});
