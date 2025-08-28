// ===== Helper Functions =====

// Sleep utility for animation delays
function sleep(speed) {
  const delay = 600 - speed * 100; // speed 1 = slow, speed 5 = fast
  return new Promise(resolve => setTimeout(resolve, delay));
}

// Metrics handling
function incrementComparisons() {
  const el = document.getElementById("comparisons");
  el.textContent = parseInt(el.textContent) + 1;
}

function incrementSwaps() {
  const el = document.getElementById("swaps");
  el.textContent = parseInt(el.textContent) + 1;
}

function incrementRecCalls() {
  const el = document.getElementById("recCalls");
  el.textContent = parseInt(el.textContent) + 1;
}

// ===== Sorting Helpers =====
function swapBars(bars, i, j) {
  let tempHeight = bars[i].style.height;
  let tempText = bars[i].textContent;

  bars[i].style.height = bars[j].style.height;
  bars[i].textContent = bars[j].textContent;

  bars[j].style.height = tempHeight;
  bars[j].textContent = tempText;

  incrementSwaps();
}

function highlightBars(bars, i, j, color) {
  if (bars[i]) bars[i].style.background = color;
  if (bars[j]) bars[j].style.background = color;
}

function resetBarColor(bars, i, j) {
  if (bars[i]) bars[i].style.background = "#38bdf8"; // default blue
  if (bars[j]) bars[j].style.background = "#38bdf8";
}

// ===== Searching Helpers =====
function highlightCell(cells, i, color) {
  if (cells[i]) {
    cells[i].style.background = color;
  }
}

// Reset all cells to default style
function resetCells(cells) {
  cells.forEach(cell => {
    cell.classList.remove("current", "done", "fade");
    cell.style.background = "#334155"; // default
  });
}

// ===== Recursion Helpers =====
function showRecursionStep(stepText, depth = 0) {
  const container = document.querySelector(".array");
  const div = document.createElement("div");
  div.classList.add("recursion");
  div.style.marginLeft = `${depth * 20}px`;
  div.textContent = stepText;
  container.appendChild(div);

  incrementRecCalls();
}
