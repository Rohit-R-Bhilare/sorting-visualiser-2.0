// ===== Linear Search =====
async function linearSearch(arr, target, speed) {
  const boxes = document.querySelectorAll(".s-cell");

  for (let i = 0; i < arr.length; i++) {
    incrementComparisons();

    highlight(boxes[i], "current");
    await sleep(500 / speed);

    if (arr[i] === target) {
      boxes[i].classList.remove("current");
      highlight(boxes[i], "done");
      return; // ✅ Stop immediately when found
    } else {
      boxes[i].classList.remove("current");
      highlight(boxes[i], "fail");
    }
  }

  // If not found
  const msg = document.createElement("div");
  msg.classList.add("recursion");
  msg.style.background = "#ef4444";
  msg.style.color = "white";
  msg.textContent = `Target ${target} not found`;
  document.querySelector(".array").appendChild(msg);
}

// ===== Binary Search =====
async function binarySearch(arr, target, speed) {
  let left = 0;
  let right = arr.length - 1;
  const boxes = document.querySelectorAll(".s-cell");

  while (left <= right) {
    incrementComparisons();
    let mid = Math.floor((left + right) / 2);

    highlight(boxes[mid], "current");
    await sleep(500 / speed);

    if (arr[mid] === target) {
      boxes[mid].classList.remove("current");
      highlight(boxes[mid], "done");
      return; // ✅ Stop immediately when found
    } else if (arr[mid] < target) {
      boxes[mid].classList.remove("current");
      highlight(boxes[mid], "fail");

      // Fade out left side
      for (let i = left; i <= mid; i++) boxes[i].classList.add("fade");
      left = mid + 1;
    } else {
      boxes[mid].classList.remove("current");
      highlight(boxes[mid], "fail");

      // Fade out right side
      for (let i = mid; i <= right; i++) boxes[i].classList.add("fade");
      right = mid - 1;
    }
  }

  // If not found
  const msg = document.createElement("div");
  msg.classList.add("recursion");
  msg.style.background = "#ef4444";
  msg.style.color = "white";
  msg.textContent = `Target ${target} not found`;
  document.querySelector(".array").appendChild(msg);
}
