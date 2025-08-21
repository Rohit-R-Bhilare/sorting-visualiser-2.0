// ====== DOM Elements ======
const sortingCard = document.getElementById("sortingCard");
const searchingCard = document.getElementById("searchingCard");
const recursionCard = document.getElementById("recursionCard");
const optionsPanel = document.getElementById("optionsPanel");
const arrayContainer = document.querySelector(".array");

// Metrics
let comparisons = 0;
let swaps = 0;
let recCalls = 0;
let startTime;

// ====== Helpers ======
function resetMetrics() {
  comparisons = 0;
  swaps = 0;
  recCalls = 0;
  document.getElementById("comparisons").textContent = comparisons;
  document.getElementById("swaps").textContent = swaps;
  document.getElementById("recCalls").textContent = recCalls;
  document.getElementById("timeTaken").textContent = 0;
}

function updateTime() {
  const timeTaken = new Date().getTime() - startTime;
  document.getElementById("timeTaken").textContent = timeTaken;
}

// ====== Event Listeners for Cards ======
sortingCard.addEventListener("click", () => {
  showSortingOptions();
});

searchingCard.addEventListener("click", () => {
  showSearchingOptions();
});

recursionCard.addEventListener("click", () => {
  showRecursionOptions();
});

// ====== Options Panel Renderers ======
function showSortingOptions() {
  optionsPanel.innerHTML = `
    <label>Array Size:</label>
    <input type="number" id="arraySize" value="20" min="5" max="50" />
    
    <label>Speed:</label>
    <input type="range" id="speed" min="1" max="5" value="3" />
    
    <label>Algorithm:</label>
    <select id="algoType">
      <option value="bubble">Bubble Sort</option>
      <option value="selection">Selection Sort</option>
      <option value="insertion">Insertion Sort</option>
      <option value="merge">Merge Sort</option>
      <option value="quick">Quick Sort</option>
    </select>
    
    <button id="startBtn">Start</button>
    <button id="resetBtn">Reset</button>
  `;

  document.getElementById("startBtn").addEventListener("click", runSorting);
  document.getElementById("resetBtn").addEventListener("click", resetArray);
  resetArray();
}

function showSearchingOptions() {
  optionsPanel.innerHTML = `
    <label>Array Size:</label>
    <input type="number" id="arraySize" value="10" min="5" max="20" />
    
    <label>Speed:</label>
    <input type="range" id="speed" min="1" max="5" value="3" />
    
    <label>Target:</label>
    <input type="number" id="targetValue" placeholder="Enter number" />
    
    <label>Algorithm:</label>
    <select id="algoType">
      <option value="linear">Linear Search</option>
      <option value="binary">Binary Search</option>
    </select>
    
    <button id="startBtn">Start</button>
    <button id="resetBtn">Reset</button>
  `;

  document.getElementById("startBtn").addEventListener("click", runSearching);
  document.getElementById("resetBtn").addEventListener("click", resetArray);
  resetArray();
}

function showRecursionOptions() {
  optionsPanel.innerHTML = `
    <label>Enter Number:</label>
    <input type="number" id="recNum" value="5" min="1" max="20" />
    
    <button id="startBtn">Start</button>
    <button id="resetBtn">Reset</button>
  `;

  document.getElementById("startBtn").addEventListener("click", runRecursion);
  document.getElementById("resetBtn").addEventListener("click", resetRecursion);
  resetRecursion();
}

// ====== Array Handling ======
function resetArray() {
  arrayContainer.innerHTML = "";
  resetMetrics();

  const size = parseInt(document.getElementById("arraySize").value);
  const arr = [];

  for (let i = 0; i < size; i++) {
    arr.push(Math.floor(Math.random() * 100) + 1);
  }

  const currentCard = optionsPanel.querySelector("select")?.value;

  if (currentCard === "linear" || currentCard === "binary") {
    // Searching (array shown as boxes)
    arr.forEach((val) => {
      const box = document.createElement("div");
      box.classList.add("s-cell");
      box.textContent = val;
      arrayContainer.appendChild(box);
    });
  } else {
    // Sorting (array shown as bars)
    arr.forEach((val) => {
      const bar = document.createElement("div");
      bar.classList.add("cell");
      bar.style.height = val * 3 + "px";
      bar.textContent = val;
      arrayContainer.appendChild(bar);
    });
  }
}

// ====== Sorting Runner ======
async function runSorting() {
  resetMetrics();
  const algo = document.getElementById("algoType").value;
  const speed = parseInt(document.getElementById("speed").value);
  const arr = Array.from(arrayContainer.children).map(el => parseInt(el.textContent));
  startTime = new Date().getTime();

  disableControls(true);

  if (algo === "bubble") await bubbleSort(arr, speed);
  if (algo === "selection") await selectionSort(arr, speed);
  if (algo === "insertion") await insertionSort(arr, speed);
  if (algo === "merge") await mergeSort(arr, 0, arr.length - 1, speed);
  if (algo === "quick") await quickSort(arr, 0, arr.length - 1, speed);

  updateTime();
  disableControls(false);
}

// ====== Searching Runner ======
async function runSearching() {
  resetMetrics();
  const algo = document.getElementById("algoType").value;
  const speed = parseInt(document.getElementById("speed").value);
  const target = parseInt(document.getElementById("targetValue").value);
  const arr = Array.from(arrayContainer.children).map(el => parseInt(el.textContent));
  startTime = new Date().getTime();

  disableControls(true);

  if (algo === "linear") await linearSearch(arr, target, speed);
  if (algo === "binary") {
    arr.sort((a, b) => a - b);
    arrayContainer.innerHTML = "";
    arr.forEach((val) => {
      const box = document.createElement("div");
      box.classList.add("s-cell");
      box.textContent = val;
      arrayContainer.appendChild(box);
    });
    await binarySearch(arr, target, speed);
  }

  updateTime();
  disableControls(false);
}

// ====== Recursion Runner ======
async function runRecursion() {
  resetMetrics();
  const n = parseInt(document.getElementById("recNum").value);
  arrayContainer.innerHTML = "";
  startTime = new Date().getTime();

  disableControls(true);

  await factorialVisualizer(n);

  updateTime();
  disableControls(false);
}

function resetRecursion() {
  arrayContainer.innerHTML = "";
  resetMetrics();
}

// ====== Disable/Enable Buttons ======
function disableControls(disable) {
  const buttons = optionsPanel.querySelectorAll("button");
  buttons.forEach(btn => btn.disabled = disable);
}

// ====== Dark Mode ======
document.querySelector(".dark-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
