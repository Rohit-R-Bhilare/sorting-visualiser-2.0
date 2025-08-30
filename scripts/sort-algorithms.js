// ================= SORTING ALGORITHMS ================= //

// ===== Bubble Sort =====
async function bubbleSort(bars, speed) {
  let n = bars.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      colorBar(bars[j], "red");
      colorBar(bars[j + 1], "red");
      updateComparisons();
      await sleep(speed);

      let val1 = parseInt(bars[j].textContent);
      let val2 = parseInt(bars[j + 1].textContent);

      if (val1 > val2) {
        updateSwaps();
        [bars[j].textContent, bars[j + 1].textContent] = [val2, val1];
        bars[j].style.height = val2 * 3 + "px";
        bars[j + 1].style.height = val1 * 3 + "px";
      }
      resetBars(bars);
    }
    colorBar(bars[n - i - 1], "green");
  }
  bars.forEach(bar => colorBar(bar, "green"));
}

// ===== Insertion Sort =====
async function insertionSort(bars, speed) {
  let n = bars.length;
  for (let i = 1; i < n; i++) {
    let key = parseInt(bars[i].textContent);
    let j = i - 1;

    while (j >= 0 && parseInt(bars[j].textContent) > key) {
      updateComparisons();
      updateSwaps();
      bars[j + 1].textContent = bars[j].textContent;
      bars[j + 1].style.height = bars[j].style.height;
      colorBar(bars[j], "red");
      await sleep(speed);
      j--;
    }
    bars[j + 1].textContent = key;
    bars[j + 1].style.height = key * 3 + "px";
    resetBars(bars);
  }
  bars.forEach(bar => colorBar(bar, "green"));
}

// ===== Selection Sort =====
async function selectionSort(bars, speed) {
  let n = bars.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      colorBar(bars[j], "red");
      updateComparisons();
      await sleep(speed);
      if (parseInt(bars[j].textContent) < parseInt(bars[minIdx].textContent)) {
        minIdx = j;
      }
      resetBars(bars);
    }
    if (minIdx !== i) {
      updateSwaps();
      let temp = bars[i].textContent;
      bars[i].textContent = bars[minIdx].textContent;
      bars[i].style.height = bars[minIdx].style.height;
      bars[minIdx].textContent = temp;
      bars[minIdx].style.height = temp * 3 + "px";
    }
    colorBar(bars[i], "green");
  }
  bars.forEach(bar => colorBar(bar, "green"));
}

// ===== Merge Sort =====
async function mergeSort(bars, l = 0, r = bars.length - 1, speed) {
  if (l >= r) return;
  let m = Math.floor((l + r) / 2);
  await mergeSort(bars, l, m, speed);
  await mergeSort(bars, m + 1, r, speed);
  await merge(bars, l, m, r, speed);
}
async function merge(bars, l, m, r, speed) {
  let left = [], right = [];
  for (let i = l; i <= m; i++) left.push(parseInt(bars[i].textContent));
  for (let i = m + 1; i <= r; i++) right.push(parseInt(bars[i].textContent));

  let i = 0, j = 0, k = l;
  while (i < left.length && j < right.length) {
    updateComparisons();
    if (left[i] <= right[j]) {
      bars[k].textContent = left[i];
      bars[k].style.height = left[i] * 3 + "px";
      i++;
    } else {
      updateSwaps();
      bars[k].textContent = right[j];
      bars[k].style.height = right[j] * 3 + "px";
      j++;
    }
    colorBar(bars[k], "orange");
    await sleep(speed);
    resetBars(bars);
    k++;
  }
  while (i < left.length) {
    bars[k].textContent = left[i];
    bars[k].style.height = left[i] * 3 + "px";
    i++; k++;
  }
  while (j < right.length) {
    bars[k].textContent = right[j];
    bars[k].style.height = right[j] * 3 + "px";
    j++; k++;
  }
  if (r - l === bars.length - 1) bars.forEach(bar => colorBar(bar, "green"));
}

// ===== Quick Sort =====
async function quickSort(bars, low = 0, high = bars.length - 1, speed) {
  if (low < high) {
    let pi = await partition(bars, low, high, speed);
    await quickSort(bars, low, pi - 1, speed);
    await quickSort(bars, pi + 1, high, speed);
  }
}
async function partition(bars, low, high, speed) {
  let pivot = parseInt(bars[high].textContent);
  let i = low - 1;
  for (let j = low; j < high; j++) {
    colorBar(bars[j], "red");
    updateComparisons();
    await sleep(speed);
    if (parseInt(bars[j].textContent) < pivot) {
      i++;
      updateSwaps();
      [bars[i].textContent, bars[j].textContent] = [bars[j].textContent, bars[i].textContent];
      [bars[i].style.height, bars[j].style.height] = [bars[j].style.height, bars[i].style.height];
    }
    resetBars(bars);
  }
  updateSwaps();
  [bars[i + 1].textContent, bars[high].textContent] = [bars[high].textContent, bars[i + 1].textContent];
  [bars[i + 1].style.height, bars[high].style.height] = [bars[high].style.height, bars[i + 1].style.height];
  return i + 1;
}

// ===== Heap Sort =====
async function heapSort(bars, speed) {
  let n = bars.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) await heapify(bars, n, i, speed);
  for (let i = n - 1; i > 0; i--) {
    updateSwaps();
    [bars[0].textContent, bars[i].textContent] = [bars[i].textContent, bars[0].textContent];
    [bars[0].style.height, bars[i].style.height] = [bars[i].style.height, bars[0].style.height];
    await heapify(bars, i, 0, speed);
    colorBar(bars[i], "green");
  }
  bars.forEach(bar => colorBar(bar, "green"));
}
async function heapify(bars, n, i, speed) {
  let largest = i;
  let l = 2 * i + 1;
  let r = 2 * i + 2;

  if (l < n && parseInt(bars[l].textContent) > parseInt(bars[largest].textContent)) largest = l;
  if (r < n && parseInt(bars[r].textContent) > parseInt(bars[largest].textContent)) largest = r;

  if (largest !== i) {
    updateSwaps();
    [bars[i].textContent, bars[largest].textContent] = [bars[largest].textContent, bars[i].textContent];
    [bars[i].style.height, bars[largest].style.height] = [bars[largest].style.height, bars[i].style.height];
    await sleep(speed);
    await heapify(bars, n, largest, speed);
  }
}

// ===== Counting Sort =====
async function countingSort(bars, speed) {
  let arr = Array.from(bars).map(b => parseInt(b.textContent));
  let max = Math.max(...arr);
  let count = new Array(max + 1).fill(0);

  arr.forEach(num => count[num]++);
  for (let i = 1; i < count.length; i++) count[i] += count[i - 1];

  let output = new Array(arr.length);
  for (let i = arr.length - 1; i >= 0; i--) {
    output[count[arr[i]] - 1] = arr[i];
    count[arr[i]]--;
  }

  for (let i = 0; i < arr.length; i++) {
    bars[i].textContent = output[i];
    bars[i].style.height = output[i] * 3 + "px";
    colorBar(bars[i], "orange");
    await sleep(speed);
    resetBars(bars);
  }
  bars.forEach(bar => colorBar(bar, "green"));
}

// ===== Radix Sort =====
async function radixSort(bars, speed) {
  let arr = Array.from(bars).map(b => parseInt(b.textContent));
  let max = Math.max(...arr);

  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    arr = await countingSortForRadix(arr, exp, bars, speed);
  }
  bars.forEach(bar => colorBar(bar, "green"));
}
async function countingSortForRadix(arr, exp, bars, speed) {
  let n = arr.length;
  let output = new Array(n);
  let count = new Array(10).fill(0);

  for (let i = 0; i < n; i++) count[Math.floor(arr[i] / exp) % 10]++;
  for (let i = 1; i < 10; i++) count[i] += count[i - 1];

  for (let i = n - 1; i >= 0; i--) {
    output[count[Math.floor(arr[i] / exp) % 10] - 1] = arr[i];
    count[Math.floor(arr[i] / exp) % 10]--;
  }

  for (let i = 0; i < n; i++) {
    arr[i] = output[i];
    bars[i].textContent = arr[i];
    bars[i].style.height = arr[i] * 3 + "px";
    colorBar(bars[i], "orange");
    await sleep(speed);
    resetBars(bars);
  }
  return arr;
}
