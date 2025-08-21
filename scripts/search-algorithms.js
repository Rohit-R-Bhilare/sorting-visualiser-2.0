// ====== Linear Search ======
async function linearSearch(arr, target, speed) {
  const boxes = document.querySelectorAll(".s-cell");

  for (let i = 0; i < arr.length; i++) {
    incrementComparisons();

    // Highlight current box
    boxes[i].classList.add("current");
    await sleep(500 / speed);

    if (arr[i] === target) {
      await markFound(boxes[i]);
      return true;
    }

    boxes[i].classList.remove("current");
    boxes[i].classList.add("fade");
  }

  // Not found
  for (let i = 0; i < boxes.length; i++) {
    await markNotFound(boxes[i]);
  }
  return false;
}

// ====== Binary Search ======
async function binarySearch(arr, target, speed) {
  const boxes = document.querySelectorAll(".s-cell");
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    incrementComparisons();

    // Highlight mid box
    boxes[mid].classList.add("current");
    await sleep(600 / speed);

    if (arr[mid] === target) {
      await markFound(boxes[mid]);
      return true;
    } else if (arr[mid] < target) {
      // Fade out left half
      for (let i = left; i <= mid; i++) {
        boxes[i].classList.add("fade");
      }
      left = mid + 1;
    } else {
      // Fade out right half
      for (let i = mid; i <= right; i++) {
        boxes[i].classList.add("fade");
      }
      right = mid - 1;
    }

    boxes[mid].classList.remove("current");
  }

  // Not found
  for (let i = 0; i < boxes.length; i++) {
    if (!boxes[i].classList.contains("done")) {
      await markNotFound(boxes[i]);
    }
  }
  return false;
}
