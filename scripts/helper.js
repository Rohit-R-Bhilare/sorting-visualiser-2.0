// ====== Delay Helper ======
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ====== Metrics Update ======
function incrementComparisons() {
  comparisons++;
  document.getElementById("comparisons").textContent = comparisons;
}

function incrementSwaps() {
  swaps++;
  document.getElementById("swaps").textContent = swaps;
}

function incrementRecCalls() {
  recCalls++;
  document.getElementById("recCalls").textContent = recCalls;
}

// ====== Sorting Helpers ======
async function swapBars(bar1, bar2, speed) {
  incrementSwaps();

  let tempHeight = bar1.style.height;
  let tempText = bar1.textContent;

  bar1.style.height = bar2.style.height;
  bar1.textContent = bar2.textContent;

  bar2.style.height = tempHeight;
  bar2.textContent = tempText;

  await sleep(500 / speed);
}

async function highlightBars(bars, indices, color, speed) {
  indices.forEach(i => {
    if (bars[i]) bars[i].style.background = color;
  });
  await sleep(400 / speed);
  indices.forEach(i => {
    if (bars[i]) bars[i].style.background = "#60a5fa";
  });
}

// ====== Searching Helpers ======
async function highlightBox(box, color, speed) {
  box.classList.add(color);
  await sleep(500 / speed);
  box.classList.remove(color);
}

async function markFound(box) {
  box.classList.add("done");
}

async function markNotFound(box) {
  box.classList.add("fail");
}

// ====== Reset Metrics & Visualization ======
function resetVisualization() {
  const arrayContainer = document.querySelector(".array");
  arrayContainer.innerHTML = "";
  document.getElementById("comparisons").textContent = "0";
  document.getElementById("swaps").textContent = "0";
  document.getElementById("recCalls").textContent = "0";
  document.getElementById("timeTaken").textContent = "0";
}
