// ===== Bubble Sort =====
async function bubbleSort(arr, speed) {
  const bars = document.querySelectorAll(".cell");
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      incrementComparisons();

      highlight(bars[j], "current");
      highlight(bars[j + 1], "current");
      await sleep(400 / speed);

      if (parseInt(bars[j].textContent) > parseInt(bars[j + 1].textContent)) {
        await swap(bars[j], bars[j + 1], speed);
      }

      unhighlight(bars[j], "current");
      unhighlight(bars[j + 1], "current");
    }
    highlight(bars[n - i - 1], "done");
  }
  highlight(bars[0], "done");
}

// ===== Selection Sort =====
async function selectionSort(arr, speed) {
  const bars = document.querySelectorAll(".cell");
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    highlight(bars[i], "current");

    for (let j = i + 1; j < n; j++) {
      incrementComparisons();
      highlight(bars[j], "current");
      await sleep(300 / speed);

      if (parseInt(bars[j].textContent) < parseInt(bars[minIdx].textContent)) {
        minIdx = j;
      }
      unhighlight(bars[j], "current");
    }

    if (minIdx !== i) {
      await swap(bars[i], bars[minIdx], speed);
    }

    unhighlight(bars[i], "current");
    highlight(bars[i], "done");
  }
  highlight(bars[n - 1], "done");
}

// ===== Insertion Sort =====
async function insertionSort(arr, speed) {
  const bars = document.querySelectorAll(".cell");
  const n = arr.length;

  for (let i = 1; i < n; i++) {
    let j = i;
    highlight(bars[j], "current");

    while (j > 0 && parseInt(bars[j - 1].textContent) > parseInt(bars[j].textContent)) {
      incrementComparisons();
      await swap(bars[j - 1], bars[j], speed);
      j--;
    }
    unhighlight(bars[j], "current");
  }

  for (let k = 0; k < n; k++) {
    highlight(bars[k], "done");
  }
}

// ===== Merge Sort =====
async function mergeSort(arr, left, right, speed) {
  if (left >= right) return;

  const mid = Math.floor((left + right) / 2);
  await mergeSort(arr, left, mid, speed);
  await mergeSort(arr, mid + 1, right, speed);
  await merge(arr, left, mid, right, speed);
}

async function merge(arr, left, mid, right, speed) {
  const bars = document.querySelectorAll(".cell");

  let leftArr = [];
  let rightArr = [];

  for (let i = left; i <= mid; i++) leftArr.push(parseInt(bars[i].textContent));
  for (let j = mid + 1; j <= right; j++) rightArr.push(parseInt(bars[j].textContent));

  let i = 0, j = 0, k = left;

  while (i < leftArr.length && j < rightArr.length) {
    incrementComparisons();

    highlight(bars[k], "current");
    await sleep(300 / speed);

    if (leftArr[i] <= rightArr[j]) {
      bars[k].style.height = leftArr[i] * 3 + "px";
      bars[k].textContent = leftArr[i];
      i++;
    } else {
      bars[k].style.height = rightArr[j] * 3 + "px";
      bars[k].textContent = rightArr[j];
      j++;
    }
    unhighlight(bars[k], "current");
    k++;
  }

  while (i < leftArr.length) {
    bars[k].style.height = leftArr[i] * 3 + "px";
    bars[k].textContent = leftArr[i];
    i++; k++;
  }

  while (j < rightArr.length) {
    bars[k].style.height = rightArr[j] * 3 + "px";
    bars[k].textContent = rightArr[j];
    j++; k++;
  }
}

// ===== Quick Sort =====
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
  highlight(bars[high], "current");

  let i = low - 1;

  for (let j = low; j < high; j++) {
    incrementComparisons();

    highlight(bars[j], "current");
    await sleep(300 / speed);

    if (parseInt(bars[j].textContent) < pivot) {
      i++;
      await swap(bars[i], bars[j], speed);
    }
    unhighlight(bars[j], "current");
  }

  await swap(bars[i + 1], bars[high], speed);
  unhighlight(bars[high], "current");

  for (let k = low; k <= high; k++) {
    if (k <= i + 1) highlight(bars[k], "done");
  }

  return i + 1;
}
