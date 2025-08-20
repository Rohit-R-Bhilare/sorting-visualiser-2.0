"use strict";

// Globals for metrics
let comparisons = 0;
let swaps = 0;
let recCalls = 0;

// Reset metrics display
function resetMetrics() {
  comparisons = 0;
  swaps = 0;
  recCalls = 0;
  document.getElementById("comparisons").innerText = 0;
  document.getElementById("swaps").innerText = 0;
  document.getElementById("recCalls").innerText = 0;
  document.getElementById("timeTaken").innerText = 0;
}

// Array generator
function generateArray(size) {
  const container = document.querySelector(".array");
  container.innerHTML = "";

  for (let i = 0; i < size; i++) {
    let value = Math.floor(Math.random() * 50) + 1;

    // bar (cell)
    let bar = document.createElement("div");
    bar.className = "cell";
    bar.style.height = `${3.5 * value}px`;
    bar.setAttribute("value", value);

    // box (s-cell)
    let box = document.createElement("div");
    box.className = "s-cell";
    box.innerText = value;

    container.appendChild(bar);
    container.appendChild(box);
  }
}

// Start button
document.querySelector(".start").addEventListener("click", async () => {
  const algoChoice = document.querySelector(".algo-menu").value;
  const size = document.querySelector(".size-menu").value;
  const speed = document.querySelector(".speed-menu").value;
  const target = document.getElementById("targetInput").value;

  if (algoChoice == 0 || size == 0) {
    alert("Please select algorithm and array size!");
    return;
  }

  resetMetrics();
  generateArray(size);

  const bars = document.querySelectorAll(".cell");
  const startTime = performance.now();

  if (algoChoice >= 1 && algoChoice <= 5) {
    let sorter = new sortAlgorithms(speed);
    if (algoChoice == 1) await sorter.BubbleSort();
    else if (algoChoice == 2) await sorter.SelectionSort();
    else if (algoChoice == 3) await sorter.InsertionSort();
    else if (algoChoice == 4) await sorter.MergeSort();
    else if (algoChoice == 5) await sorter.QuickSort();
  } else if (algoChoice == 6 || algoChoice == 7) {
    if (target === "") {
      alert("Please enter a target value for searching!");
      return;
    }
    let searcher = new searchAlgorithms(speed);
    if (algoChoice == 6) await searcher.LinearSearch(parseInt(target));
    else await searcher.BinarySearch(parseInt(target));
  } else if (algoChoice == 8) {
    let rec = new recursionVisualizer(speed);
    recCalls = 0;
    await rec.factorial(size);
  }

  const endTime = performance.now();
  document.getElementById("timeTaken").innerText = (endTime - startTime).toFixed(2);
});

// Reset button
document.querySelector(".reset").addEventListener("click", () => {
  const size = document.querySelector(".size-menu").value;
  if (size > 0) {
    generateArray(size);
    resetMetrics();
  }
});

// Dark mode toggle
document.querySelector(".dark-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});
