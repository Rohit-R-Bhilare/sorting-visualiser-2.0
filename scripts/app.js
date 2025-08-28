// ===== Theme Toggle =====
const toggleBtn = document.getElementById("themeToggle");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
  document.body.classList.toggle("dark");

  toggleBtn.textContent = document.body.classList.contains("light") ? "☀️" : "🌙";
  localStorage.setItem(
    "theme",
    document.body.classList.contains("light") ? "light" : "dark"
  );
});

// Load saved theme preference
window.onload = () => {
  const theme = localStorage.getItem("theme") || "dark";
  document.body.classList.add(theme);
  toggleBtn.textContent = theme === "light" ? "☀️" : "🌙";
};

// ===== DOM Elements =====
const dashboardCards = document.querySelectorAll(".algo-card");
const optionsPanel = document.getElementById("optionsPanel");
const arrayContainer = document.querySelector(".array");

// Metrics
const comparisonsEl = document.getElementById("comparisons");
const swapsEl = document.getElementById("swaps");
const recCallsEl = document.getElementById("recCalls");
const timeTakenEl = document.getElementById("timeTaken");

// ===== Global State =====
let currentAlgo = null;
let speed = 3;
let size = 20;
let targetValue = null;
let selectedRecursion = "factorial";

// ===== Reset Metrics =====
function resetMetrics() {
  comparisonsEl.textContent = "0";
  swapsEl.textContent = "0";
  recCallsEl.textContent = "0";
  timeTakenEl.textContent = "0";
}

// ===== Generate Array =====
function generateArray(size) {
  arrayContainer.innerHTML = "";
  const arr = [];
  for (let i = 0; i < size; i++) {
    arr.push(Math.floor(Math.random() * 90) + 10);
  }
  arr.forEach(val => {
    const bar = document.createElement("div");
    bar.classList.add("cell");
    bar.style.height = `${val * 2}px`;
    bar.textContent = val;
    arrayContainer.appendChild(bar);
  });
}

// ===== Dashboard Clicks =====
dashboardCards.forEach(card => {
  card.addEventListener("click", () => {
    currentAlgo = card.dataset.type;
    renderOptions(currentAlgo);
  });
});

// ===== Render Options Based on Algo =====
function renderOptions(type) {
  optionsPanel.innerHTML = "";
  resetMetrics();
  arrayContainer.innerHTML = "";

  if (type === "sorting") {
    optionsPanel.innerHTML = `
      <label>Size: <input id="sizeInput" type="number" value="20" min="5" max="100"></label>
      <label>Speed: <input id="speedInput" type="range" min="1" max="5" value="3"></label>
      <select id="sortSelect">
        <option value="bubble">Bubble Sort</option>
        <option value="selection">Selection Sort</option>
        <option value="insertion">Insertion Sort</option>
        <option value="quick">Quick Sort</option>
        <option value="merge">Merge Sort</option>
        <option value="heap">Heap Sort</option>
      </select>
      <button id="startBtn">Start</button>
      <button id="resetBtn">Reset</button>
    `;
    addSortingListeners();
  }

  if (type === "searching") {
    optionsPanel.innerHTML = `
      <label>Size: <input id="sizeInput" type="number" value="15" min="5" max="30"></label>
      <label>Speed: <input id="speedInput" type="range" min="1" max="5" value="3"></label>
      <label>Target: <input id="targetInput" type="number" placeholder="Enter value"></label>
      <select id="searchSelect">
        <option value="linear">Linear Search</option>
        <option value="binary">Binary Search</option>
        <option value="jump">Jump Search</option>
      </select>
      <button id="startBtn">Start</button>
      <button id="resetBtn">Reset</button>
    `;
    addSearchingListeners();
  }

  if (type === "recursion") {
    optionsPanel.innerHTML = `
      <label>Number: <input id="numInput" type="number" value="5" min="1" max="12"></label>
      <select id="recSelect">
        <option value="factorial">Factorial</option>
        <option value="fibonacci">Fibonacci</option>
      </select>
      <button id="startBtn">Start</button>
      <button id="resetBtn">Reset</button>
    `;
    addRecursionListeners();
  }
}

// ===== Sorting Listeners =====
function addSortingListeners() {
  document.getElementById("sizeInput").addEventListener("change", e => {
    size = e.target.value;
    generateArray(size);
  });
  document.getElementById("speedInput").addEventListener("input", e => {
    speed = e.target.value;
  });

  generateArray(size);

  document.getElementById("startBtn").addEventListener("click", async () => {
    resetMetrics();
    const algo = document.getElementById("sortSelect").value;
    const bars = document.querySelectorAll(".cell");
    const startTime = performance.now();

    if (algo === "bubble") await bubbleSort(bars, speed);
    if (algo === "selection") await selectionSort(bars, speed);
    if (algo === "insertion") await insertionSort(bars, speed);
    if (algo === "quick") await quickSort(bars, 0, bars.length - 1, speed);
    if (algo === "merge") await mergeSort(bars, 0, bars.length - 1, speed);
    if (algo === "heap") await heapSort(bars, speed);

    const endTime = performance.now();
    timeTakenEl.textContent = Math.round(endTime - startTime);
  });

  document.getElementById("resetBtn").addEventListener("click", () => {
    resetMetrics();
    generateArray(size);
  });
}

// ===== Searching Listeners =====
function addSearchingListeners() {
  document.getElementById("sizeInput").addEventListener("change", e => {
    size = e.target.value;
    generateSearchArray(size);
  });
  document.getElementById("speedInput").addEventListener("input", e => {
    speed = e.target.value;
  });

  generateSearchArray(size);

  document.getElementById("startBtn").addEventListener("click", async () => {
    resetMetrics();
    targetValue = parseInt(document.getElementById("targetInput").value);
    const algo = document.getElementById("searchSelect").value;
    const cells = document.querySelectorAll(".s-cell");
    const arr = Array.from(cells).map(c => parseInt(c.textContent));

    const startTime = performance.now();

    if (algo === "linear") await linearSearch(arr, targetValue, speed);
    if (algo === "binary") await binarySearch(arr, targetValue, speed);
    if (algo === "jump") await jumpSearch(arr, targetValue, speed);

    const endTime = performance.now();
    timeTakenEl.textContent = Math.round(endTime - startTime);
  });

  document.getElementById("resetBtn").addEventListener("click", () => {
    resetMetrics();
    generateSearchArray(size);
  });
}

// ===== Recursion Listeners =====
function addRecursionListeners() {
  document.getElementById("startBtn").addEventListener("click", async () => {
    resetMetrics();
    arrayContainer.innerHTML = "";
    const num = parseInt(document.getElementById("numInput").value);
    const type = document.getElementById("recSelect").value;

    const startTime = performance.now();
    if (type === "factorial") {
      await factorialVisualizer(num);
    }
    if (type === "fibonacci") {
      await fibonacciVisualizer(num);
    }
    const endTime = performance.now();
    timeTakenEl.textContent = Math.round(endTime - startTime);
  });

  document.getElementById("resetBtn").addEventListener("click", () => {
    resetMetrics();
    arrayContainer.innerHTML = "";
  });
}

// ===== Generate Search Array =====
function generateSearchArray(size) {
  arrayContainer.innerHTML = "";
  const arr = [];
  let start = 5;
  for (let i = 0; i < size; i++) {
    arr.push(start);
    start += Math.floor(Math.random() * 5) + 1; // increasing values
  }
  arr.forEach(val => {
    const cell = document.createElement("div");
    cell.classList.add("s-cell");
    cell.textContent = val;
    arrayContainer.appendChild(cell);
  });
}
