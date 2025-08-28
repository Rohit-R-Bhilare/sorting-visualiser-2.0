// ===== Searching Algorithms =====

// Linear Search
async function linearSearch(arr, target, speed) {
  const container = document.querySelector(".array");
  container.innerHTML = "";
  arr.forEach(val => {
    const cell = document.createElement("div");
    cell.classList.add("s-cell");
    cell.textContent = val;
    container.appendChild(cell);
  });

  const cells = document.querySelectorAll(".s-cell");

  for (let i = 0; i < arr.length; i++) {
    incrementComparisons();
    cells[i].classList.add("current");
    await sleep(speed);

    if (arr[i] === target) {
      cells[i].classList.remove("current");
      cells[i].classList.add("done");
      return true;
    }

    cells[i].classList.remove("current");
    cells[i].classList.add("fade");
  }

  return false;
}

// Binary Search
async function binarySearch(arr, target, speed) {
  arr.sort((a, b) => a - b);
  const container = document.querySelector(".array");
  container.innerHTML = "";
  arr.forEach(val => {
    const cell = document.createElement("div");
    cell.classList.add("s-cell");
    cell.textContent = val;
    container.appendChild(cell);
  });

  const cells = document.querySelectorAll(".s-cell");

  let left = 0, right = arr.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    incrementComparisons();

    cells[mid].classList.add("current");
    await sleep(speed);

    if (arr[mid] === target) {
      cells[mid].classList.remove("current");
      cells[mid].classList.add("done");
      return true;
    } else if (arr[mid] < target) {
      for (let i = left; i <= mid; i++) cells[i].classList.add("fade");
      left = mid + 1;
    } else {
      for (let i = mid; i <= right; i++) cells[i].classList.add("fade");
      right = mid - 1;
    }

    cells[mid].classList.remove("current");
  }

  return false;
}

// Jump Search
async function jumpSearch(arr, target, speed) {
  arr.sort((a, b) => a - b);
  const container = document.querySelector(".array");
  container.innerHTML = "";
  arr.forEach(val => {
    const cell = document.createElement("div");
    cell.classList.add("s-cell");
    cell.textContent = val;
    container.appendChild(cell);
  });

  const cells = document.querySelectorAll(".s-cell");
  const n = arr.length;
  let step = Math.floor(Math.sqrt(n));
  let prev = 0;

  // Jump through blocks
  while (arr[Math.min(step, n) - 1] < target) {
    incrementComparisons();

    // Highlight jump block
    for (let i = prev; i < Math.min(step, n); i++) {
      cells[i].classList.add("fade");
    }

    prev = step;
    step += Math.floor(Math.sqrt(n));
    await sleep(speed);

    if (prev >= n) return false;
  }

  // Linear search in block
  for (let i = prev; i < Math.min(step, n); i++) {
    incrementComparisons();
    cells[i].classList.add("current");
    await sleep(speed);

    if (arr[i] === target) {
      cells[i].classList.remove("current");
      cells[i].classList.add("done");
      return true;
    }

    cells[i].classList.remove("current");
    cells[i].classList.add("fade");
  }

  return false;
}
