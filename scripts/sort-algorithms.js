// ===== Sorting Algorithms =====

// Bubble Sort
async function bubbleSort(arr, speed) {
  const bars = document.querySelectorAll(".cell");
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      incrementComparisons();
      highlightBars(bars, j, j + 1, "yellow");
      await sleep(speed);
      if (parseInt(bars[j].textContent) > parseInt(bars[j + 1].textContent)) {
        swapBars(bars, j, j + 1);
      }
      resetBarColor(bars, j, j + 1);
    }
  }
}

// Selection Sort
async function selectionSort(arr, speed) {
  const bars = document.querySelectorAll(".cell");
  for (let i = 0; i < arr.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      incrementComparisons();
      highlightBars(bars, minIndex, j, "orange");
      await sleep(speed);
      if (parseInt(bars[j].textContent) < parseInt(bars[minIndex].textContent)) {
        minIndex = j;
      }
      resetBarColor(bars, minIndex, j);
    }
    if (minIndex !== i) {
      swapBars(bars, i, minIndex);
    }
  }
}

// Insertion Sort
async function insertionSort(arr, speed) {
  const bars = document.querySelectorAll(".cell");
  for (let i = 1; i < arr.length; i++) {
    let key = parseInt(bars[i].textContent);
    let j = i - 1;
    while (j >= 0 && parseInt(bars[j].textContent) > key) {
      incrementComparisons();
      highlightBars(bars, j, j + 1, "red");
      await sleep(speed);
      bars[j + 1].style.height = bars[j].style.height;
      bars[j + 1].textContent = bars[j].textContent;
      resetBarColor(bars, j, j + 1);
      j--;
    }
    bars[j + 1].style.height = `${key * 3}px`;
    bars[j + 1].textContent = key;
  }
}

// Merge Sort
async function mergeSort(arr, l, r, speed) {
  if (l >= r) return;
  const mid = Math.floor((l + r) / 2);
  await mergeSort(arr, l, mid, speed);
  await mergeSort(arr, mid + 1, r, speed);
  await merge(arr, l, mid, r, speed);
}

async function merge(arr, l, mid, r, speed) {
  const bars = document.querySelectorAll(".cell");
  let left = [];
  let right = [];
  for (let i = l; i <= mid; i++) left.push(parseInt(bars[i].textContent));
  for (let j = mid + 1; j <= r; j++) right.push(parseInt(bars[j].textContent));

  let i = 0, j = 0, k = l;
  while (i < left.length && j < right.length) {
    incrementComparisons();
    highlightBars(bars, k, k, "purple");
    await sleep(speed);
    if (left[i] <= right[j]) {
      bars[k].style.height = `${left[i] * 3}px`;
      bars[k].textContent = left[i];
      i++;
    } else {
      bars[k].style.height = `${right[j] * 3}px`;
      bars[k].textContent = right[j];
      j++;
    }
    resetBarColor(bars, k, k);
    k++;
  }
  while (i < left.length) {
    bars[k].style.height = `${left[i] * 3}px`;
    bars[k].textContent = left[i];
    i++;
    k++;
  }
  while (j < right.length) {
    bars[k].style.height = `${right[j] * 3}px`;
    bars[k].textContent = right[j];
    j++;
    k++;
  }
}

// Quick Sort
async function quickSort(arr, low, high, speed) {
  if (low < high) {
    let pi = await partition(arr, low, high, speed);
    await quickSort(arr, low, pi - 1, speed);
    await quickSort(arr, pi + 1, high, speed);
  }
}

async function partition(arr, low, high, speed) {
  const bars = document.querySelectorAll(".cell");
  let pivot = parseInt(bars[high].textContent);
  let i = low - 1;
  for (let j = low; j < high; j++) {
    incrementComparisons();
    highlightBars(bars, j, high, "orange");
    await sleep(speed);
    if (parseInt(bars[j].textContent) < pivot) {
      i++;
      swapBars(bars, i, j);
    }
    resetBarColor(bars, j, high);
  }
  swapBars(bars, i + 1, high);
  return i + 1;
}

// ===== Heap Sort =====
async function heapSort(arr, speed) {
  const n = arr.length;
  const bars = document.querySelectorAll(".cell");

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    await heapify(bars, n, i, speed);
  }

  // Extract elements
  for (let i = n - 1; i > 0; i--) {
    swapBars(bars, 0, i);
    await sleep(speed);
    await heapify(bars, i, 0, speed);
  }
}

async function heapify(bars, n, i, speed) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < n) {
    incrementComparisons();
    if (parseInt(bars[left].textContent) > parseInt(bars[largest].textContent)) {
      largest = left;
    }
  }

  if (right < n) {
    incrementComparisons();
    if (parseInt(bars[right].textContent) > parseInt(bars[largest].textContent)) {
      largest = right;
    }
  }

  if (largest !== i) {
    swapBars(bars, i, largest);
    highlightBars(bars, i, largest, "red");
    await sleep(speed);
    resetBarColor(bars, i, largest);
    await heapify(bars, n, largest, speed);
  }
}
