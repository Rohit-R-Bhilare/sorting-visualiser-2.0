// ====== Bubble Sort ======
async function bubbleSort(arr, speed) {
  const bars = document.querySelectorAll(".cell");
  let n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      incrementComparisons();
      await highlightBars(bars, [j, j + 1], "#f59e0b", speed);

      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        await swapBars(bars[j], bars[j + 1], speed);
      }
    }
  }
}

// ====== Selection Sort ======
async function selectionSort(arr, speed) {
  const bars = document.querySelectorAll(".cell");
  let n = arr.length;

  for (let i = 0; i < n; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      incrementComparisons();
      await highlightBars(bars, [minIdx, j], "#f59e0b", speed);

      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }

    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      await swapBars(bars[i], bars[minIdx], speed);
    }
  }
}

// ====== Insertion Sort ======
async function insertionSort(arr, speed) {
  const bars = document.querySelectorAll(".cell");
  let n = arr.length;

  for (let i = 1; i < n; i++) {
    let key = arr[i];
    let j = i - 1;

    while (j >= 0 && arr[j] > key) {
      incrementComparisons();
      arr[j + 1] = arr[j];

      bars[j + 1].style.height = bars[j].style.height;
      bars[j + 1].textContent = bars[j].textContent;

      j--;
      incrementSwaps();
      await sleep(500 / speed);
    }
    arr[j + 1] = key;

    bars[j + 1].style.height = key * 3 + "px";
    bars[j + 1].textContent = key;

    await sleep(500 / speed);
  }
}

// ====== Merge Sort ======
async function mergeSort(arr, l, r, speed) {
  if (l >= r) return;
  const m = Math.floor((l + r) / 2);

  await mergeSort(arr, l, m, speed);
  await mergeSort(arr, m + 1, r, speed);
  await merge(arr, l, m, r, speed);
}

async function merge(arr, l, m, r, speed) {
  const bars = document.querySelectorAll(".cell");

  let n1 = m - l + 1;
  let n2 = r - m;

  let L = arr.slice(l, m + 1);
  let R = arr.slice(m + 1, r + 1);

  let i = 0, j = 0, k = l;

  while (i < n1 && j < n2) {
    incrementComparisons();
    await highlightBars(bars, [k], "#f59e0b", speed);

    if (L[i] <= R[j]) {
      arr[k] = L[i];
      bars[k].style.height = L[i] * 3 + "px";
      bars[k].textContent = L[i];
      i++;
    } else {
      arr[k] = R[j];
      bars[k].style.height = R[j] * 3 + "px";
      bars[k].textContent = R[j];
      j++;
    }
    k++;
    await sleep(500 / speed);
  }

  while (i < n1) {
    arr[k] = L[i];
    bars[k].style.height = L[i] * 3 + "px";
    bars[k].textContent = L[i];
    i++; k++;
    await sleep(400 / speed);
  }

  while (j < n2) {
    arr[k] = R[j];
    bars[k].style.height = R[j] * 3 + "px";
    bars[k].textContent = R[j];
    j++; k++;
    await sleep(400 / speed);
  }
}

// ====== Quick Sort ======
async function quickSort(arr, low, high, speed) {
  if (low < high) {
    let pi = await partition(arr, low, high, speed);

    await quickSort(arr, low, pi - 1, speed);
    await quickSort(arr, pi + 1, high, speed);
  }
}

async function partition(arr, low, high, speed) {
  const bars = document.querySelectorAll(".cell");
  let pivot = arr[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    incrementComparisons();
    await highlightBars(bars, [j, high], "#f59e0b", speed);

    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
      await swapBars(bars[i], bars[j], speed);
    }
  }

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  await swapBars(bars[i + 1], bars[high], speed);

  return i + 1;
}
