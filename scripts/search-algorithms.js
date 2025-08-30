// ================= SEARCHING ALGORITHMS ================= //

// ===== Linear Search =====
async function linearSearch(bars, target, speed) {
  resetBars(bars);
  for (let i = 0; i < bars.length; i++) {
    colorBar(bars[i], "red");
    updateComparisons();
    await sleep(speed);

    if (parseInt(bars[i].textContent) === target) {
      colorBar(bars[i], "green");
      addResultCard("Linear Search", `Found ${target} at index ${i}`);
      return;
    }
    resetBars(bars);
  }
  addResultCard("Linear Search", `${target} not found`);
}

// ===== Binary Search =====
async function binarySearch(bars, target, speed) {
  // Binary search requires sorted array
  let arr = Array.from(bars).map(b => parseInt(b.textContent));
  arr.sort((a, b) => a - b);
  renderArray(arr);
  bars = document.querySelectorAll(".bar");

  let low = 0, high = arr.length - 1;
  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    colorBar(bars[mid], "orange");
    updateComparisons();
    await sleep(speed);

    if (arr[mid] === target) {
      colorBar(bars[mid], "green");
      addResultCard("Binary Search", `Found ${target} at index ${mid}`);
      return;
    } else if (arr[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
    resetBars(bars);
  }
  addResultCard("Binary Search", `${target} not found`);
}

// ===== Jump Search =====
async function jumpSearch(bars, target, speed) {
  let arr = Array.from(bars).map(b => parseInt(b.textContent));
  arr.sort((a, b) => a - b);
  renderArray(arr);
  bars = document.querySelectorAll(".bar");

  let n = arr.length;
  let step = Math.floor(Math.sqrt(n));
  let prev = 0;

  while (arr[Math.min(step, n) - 1] < target) {
    for (let i = prev; i < Math.min(step, n); i++) {
      colorBar(bars[i], "red");
    }
    updateComparisons();
    await sleep(speed);

    prev = step;
    step += Math.floor(Math.sqrt(n));
    if (prev >= n) {
      addResultCard("Jump Search", `${target} not found`);
      return;
    }
    resetBars(bars);
  }

  for (let i = prev; i < Math.min(step, n); i++) {
    colorBar(bars[i], "orange");
    updateComparisons();
    await sleep(speed);
    if (arr[i] === target) {
      colorBar(bars[i], "green");
      addResultCard("Jump Search", `Found ${target} at index ${i}`);
      return;
    }
    resetBars(bars);
  }
  addResultCard("Jump Search", `${target} not found`);
}

// ===== Exponential Search =====
async function exponentialSearch(bars, target, speed) {
  let arr = Array.from(bars).map(b => parseInt(b.textContent));
  arr.sort((a, b) => a - b);
  renderArray(arr);
  bars = document.querySelectorAll(".bar");

  if (arr[0] === target) {
    colorBar(bars[0], "green");
    addResultCard("Exponential Search", `Found ${target} at index 0`);
    return;
  }

  let i = 1;
  while (i < arr.length && arr[i] <= target) {
    colorBar(bars[i], "red");
    updateComparisons();
    await sleep(speed);
    i *= 2;
  }

  // Binary Search in range [i/2, min(i, arr.length)]
  let low = Math.floor(i / 2), high = Math.min(i, arr.length - 1);
  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    colorBar(bars[mid], "orange");
    updateComparisons();
    await sleep(speed);

    if (arr[mid] === target) {
      colorBar(bars[mid], "green");
      addResultCard("Exponential Search", `Found ${target} at index ${mid}`);
      return;
    } else if (arr[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
    resetBars(bars);
  }

  addResultCard("Exponential Search", `${target} not found`);
}
