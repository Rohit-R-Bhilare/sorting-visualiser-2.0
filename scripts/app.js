// ===== Global State =====
let selectedCategory = null;
let selectedAlgorithm = null;
let speed = 300;
let arraySize = 20;
let targetValue = null;
let numberInput = null;
let comparisons = 0, swaps = 0, recursiveCalls = 0, steps = 0;

// ===== Metrics Reset & Update =====
function resetMetrics() {
  comparisons = 0; swaps = 0; recursiveCalls = 0; steps = 0;
  document.getElementById("comparisons").textContent = 0;
  document.getElementById("swaps").textContent = 0;
  document.getElementById("recursive-calls").textContent = 0;
  document.getElementById("steps").textContent = 0;
}

function incrementComparisons() {
  comparisons++;
  document.getElementById("comparisons").textContent = comparisons;
}
function incrementSwaps() {
  swaps++;
  document.getElementById("swaps").textContent = swaps;
}
function incrementRecursiveCalls() {
  recursiveCalls++;
  document.getElementById("recursive-calls").textContent = recursiveCalls;
}
function incrementSteps() {
  steps++;
  document.getElementById("steps").textContent = steps;
}

// ===== Utility =====
function generateRandomArray(size = 20, maxVal = 100) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * maxVal) + 1);
}
function renderArray(arr) {
  const container = document.getElementById("bars-container");
  container.innerHTML = "";
  arr.forEach(val => {
    const bar = document.createElement("div");
    bar.className = "bar";
    bar.style.height = `${val * 3}px`;
    bar.style.width = `${Math.max(10, 600/arr.length)}px`;
    bar.textContent = val;
    container.appendChild(bar);
  });
}

// ===== Dashboard Selection =====
document.querySelectorAll(".algo-card").forEach(card => {
  card.addEventListener("click", () => {
    selectedCategory = card.dataset.category;
    document.getElementById("dashboard").classList.add("hidden");
    document.getElementById("controls-section").classList.remove("hidden");
    document.getElementById("algo-title").textContent = `${card.textContent} Controls`;
    buildControls(selectedCategory);
  });
});

// ===== Build Dynamic Controls =====
function buildControls(category) {
  const controls = document.getElementById("controls");
  controls.innerHTML = "";

  if (category === "sorting" || category === "searching") {
    // Array size
    let sizeInput = document.createElement("input");
    sizeInput.type = "number";
    sizeInput.value = arraySize;
    sizeInput.min = 5; sizeInput.max = 100;
    sizeInput.onchange = e => arraySize = parseInt(e.target.value);
    controls.appendChild(labelWrap("Array Size", sizeInput));

    // Speed
    let speedInput = document.createElement("input");
    speedInput.type = "range"; speedInput.min = 50; speedInput.max = 1000;
    speedInput.value = speed;
    speedInput.oninput = e => speed = parseInt(e.target.value);
    controls.appendChild(labelWrap("Speed", speedInput));

    if (category === "searching") {
      let target = document.createElement("input");
      target.type = "number";
      target.placeholder = "Target Value";
      target.onchange = e => targetValue = parseInt(e.target.value);
      controls.appendChild(labelWrap("Target", target));
    }
  }
  else if (category === "recursion") {
    let num = document.createElement("input");
    num.type = "number";
    num.placeholder = "Enter Number";
    num.onchange = e => numberInput = parseInt(e.target.value);
    controls.appendChild(labelWrap("Number", num));
  }
  else if (category === "dp") {
    // Example control for DP string input
    let str1 = document.createElement("input");
    str1.placeholder = "String 1";
    let str2 = document.createElement("input");
    str2.placeholder = "String 2";
    controls.appendChild(labelWrap("DP Input 1", str1));
    controls.appendChild(labelWrap("DP Input 2", str2));
  }
  else {
    // For graph/advanced: placeholder
    let msg = document.createElement("p");
    msg.textContent = "Controls will appear here.";
    controls.appendChild(msg);
  }
}


// Helper wrapper
function labelWrap(label, element) {
  let div = document.createElement("div");
  let span = document.createElement("span");
  span.textContent = label + ": ";
  div.appendChild(span);
  div.appendChild(element);
  return div;
}

// ===== Buttons =====
document.getElementById("start-btn").addEventListener("click", () => {
  resetMetrics();
  document.getElementById("results-cards").innerHTML = "";
  document.getElementById("recursion-steps").innerHTML = "";
  document.getElementById("bars-container").innerHTML = "";
  document.getElementById("dp-grid").innerHTML = "";

  if (selectedCategory === "sorting") {
    let arr = generateRandomArray(arraySize);
    renderArray(arr);
    let bars = document.querySelectorAll(".bar");
    bubbleSort(bars, speed); // default algo, could add selector for user
  }
  else if (selectedCategory === "searching") {
    let arr = generateRandomArray(arraySize);
    renderArray(arr);
    let bars = document.querySelectorAll(".bar");
    if (targetValue !== null) {
      linearSearch(bars, targetValue, speed); // default search
    }
  }
  else if (selectedCategory === "recursion") {
    if (numberInput !== null) {
      factorialVisual(numberInput); // default recursion
    }
  }
  else if (selectedCategory === "dp") {
    // Example run DP LCS with dummy strings
    let s1 = "abcde", s2 = "ace";
    runLCS(s1, s2, document.getElementById("dp-grid"), speed);
  }
});

document.getElementById("reset-btn").addEventListener("click", () => {
  resetMetrics();
  document.getElementById("bars-container").innerHTML = "";
  document.getElementById("dp-grid").innerHTML = "";
  document.getElementById("recursion-steps").innerHTML = "";
  document.getElementById("results-cards").innerHTML = "";
  selectedCategory = null;
  selectedAlgorithm = null;
  document.getElementById("controls-section").classList.add("hidden");
  document.getElementById("dashboard").classList.remove("hidden");
});

// ===== Dark / Light Mode =====
document.getElementById("theme-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
