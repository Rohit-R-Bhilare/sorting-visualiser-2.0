// ===== Delay Utility =====
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ===== Metrics =====
let comparisons = 0;
let swaps = 0;
let recCalls = 0;

function resetMetrics() {
  comparisons = 0;
  swaps = 0;
  recCalls = 0;
  updateMetrics("comparisons", comparisons);
  updateMetrics("swaps", swaps);
  updateMetrics("recCalls", recCalls);
  updateMetrics("timeTaken", 0);
}

function updateMetrics(type, value) {
  document.getElementById(type).textContent = value;
}

function incrementComparisons() {
  comparisons++;
  updateMetrics("comparisons", comparisons);
}

function incrementSwaps() {
  swaps++;
  updateMetrics("swaps", swaps);
}

function incrementRecCalls() {
  recCalls++;
  updateMetrics("recCalls", recCalls);
}

// ===== Highlighting (for visualization) =====
function highlight(element, className) {
  if (element) element.classList.add(className);
}

function unhighlight(element, className) {
  if (element) element.classList.remove(className);
}

// ===== Swap for Sorting =====
async function swap(bar1, bar2, speed) {
  incrementSwaps();
  highlight(bar1, "current");
  highlight(bar2, "current");

  await sleep(500 / speed);

  let tempHeight = bar1.style.height;
  let tempText = bar1.textContent;

  bar1.style.height = bar2.style.height;
  bar1.textContent = bar2.textContent;

  bar2.style.height = tempHeight;
  bar2.textContent = tempText;

  unhighlight(bar1, "current");
  unhighlight(bar2, "current");
}
