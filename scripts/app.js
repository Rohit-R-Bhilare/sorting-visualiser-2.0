// === Selectors ===
const algoMenu = document.querySelector(".algo-menu");
const sizeMenu = document.querySelector(".size-menu");
const speedMenu = document.querySelector(".speed-menu");
const startBtn = document.querySelector(".start");
const resetBtn = document.querySelector(".reset");
const targetInput = document.getElementById("targetInput");
const recursionInput = document.getElementById("recursionInput");

const sizeGroup = document.getElementById("sizeGroup");
const speedGroup = document.getElementById("speedGroup");
const targetGroup = document.getElementById("targetGroup");
const recursionInputGroup = document.getElementById("recursionInputGroup");

const arrayContainer = document.querySelector(".array");

// === Handle Dynamic Dashboard ===
algoMenu.addEventListener("change", () => {
  const algo = parseInt(algoMenu.value);

  // Hide all groups initially
  sizeGroup.style.display = "none";
  speedGroup.style.display = "none";
  targetGroup.style.display = "none";
  recursionInputGroup.style.display = "none";

  if (algo >= 1 && algo <= 5) {
    // Sorting
    sizeGroup.style.display = "block";
    speedGroup.style.display = "block";
  } else if (algo === 6 || algo === 7) {
    // Searching
    sizeGroup.style.display = "block";
    speedGroup.style.display = "block";
    targetGroup.style.display = "block";
  } else if (algo === 8) {
    // Recursion
    recursionInputGroup.style.display = "block";
  }
});

// === Start Button ===
startBtn.addEventListener("click", async () => {
  const algo = parseInt(algoMenu.value);
  const size = parseInt(sizeMenu.value);
  const speed = parseInt(speedMenu.value);
  const target = parseInt(targetInput.value);
  const n = parseInt(recursionInput.value);

  resetMetrics();
  arrayContainer.innerHTML = "";

  if (algo >= 1 && algo <= 5) {
    // ===== Sorting =====
    if (!size || !speed) return alert("Please select size and speed");
    let arr = generateArray(size);

    const startTime = performance.now();
    if (algo === 1) await bubbleSort(arr, speed);
    else if (algo === 2) await selectionSort(arr, speed);
    else if (algo === 3) await insertionSort(arr, speed);
    else if (algo === 4) await mergeSort(arr, 0, arr.length - 1, speed);
    else if (algo === 5) await quickSort(arr, 0, arr.length - 1, speed);

    updateMetrics("timeTaken", Math.round(performance.now() - startTime));

  } else if (algo === 6 || algo === 7) {
    // ===== Searching =====
    if (!size || !speed || isNaN(target)) return alert("Enter size, speed, and target");
    let arr = generateBoxes(size);

    if (algo === 7) {
      arr.sort((a, b) => a - b);
      updateBoxes(arr);
    }

    const startTime = performance.now();
    if (algo === 6) await linearSearch(arr, target, speed);
    else await binarySearch(arr, target, speed);

    updateMetrics("timeTaken", Math.round(performance.now() - startTime));

  } else if (algo === 8) {
    // ===== Recursion =====
    if (!n) return alert("Enter a number for factorial");

    const startTime = performance.now();
    runFactorial(n);
    updateMetrics("timeTaken", Math.round(performance.now() - startTime));
  } else {
    alert("Please select an algorithm");
  }
});

// === Reset Button ===
resetBtn.addEventListener("click", () => {
  arrayContainer.innerHTML = "";
  resetMetrics();
  targetInput.value = "";
  recursionInput.value = "";
});

// === Dark Mode Toggle ===
document.querySelector(".dark-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// === Helper Generators ===

// Generate array bars for sorting
function generateArray(size) {
  arrayContainer.innerHTML = "";
  const arr = [];
  for (let i = 0; i < size; i++) {
    arr.push(Math.floor(Math.random() * 100) + 1);
  }
  arr.forEach(val => {
    const bar = document.createElement("div");
    bar.classList.add("cell");
    bar.style.height = val * 3 + "px";
    bar.textContent = val;
    arrayContainer.appendChild(bar);
  });
  return arr;
}

// Generate boxes for searching
function generateBoxes(size) {
  arrayContainer.innerHTML = "";
  const arr = [];
  for (let i = 0; i < size; i++) {
    arr.push(Math.floor(Math.random() * 50) + 1);
  }
  arr.forEach(val => {
    const box = document.createElement("div");
    box.classList.add("s-cell");
    box.textContent = val;
    arrayContainer.appendChild(box);
  });
  return arr;
}

// Update boxes after sorting (binary search)
function updateBoxes(arr) {
  arrayContainer.innerHTML = "";
  arr.forEach(val => {
    const box = document.createElement("div");
    box.classList.add("s-cell");
    box.textContent = val;
    arrayContainer.appendChild(box);
  });
}
