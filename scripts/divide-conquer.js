// ================= DIVIDE & CONQUER ALGORITHMS ================= //

// ===== Binary Search (Divide & Conquer) =====
async function binarySearchVisual(arr, target, speed) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    highlightCell(mid, "yellow");
    updateComparisons();
    await sleep(speed);

    if (parseInt(arr[mid].textContent) === target) {
      highlightCell(mid, "green");
      addResultCard("Binary Search", `Found ${target} at index ${mid}`);
      return mid;
    }
    if (parseInt(arr[mid].textContent) < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
    resetCells(arr);
  }
  addResultCard("Binary Search", `${target} not found`);
  return -1;
}

// ===== Merge Sort (Divide & Conquer) =====
// (Already defined in sort-algorithms.js, reusing same function)
// Provided here for category grouping
async function mergeSortDC(arr, l = 0, r = arr.length - 1, speed) {
  return await mergeSort(arr, l, r, speed);
}

// ===== Quick Sort (Divide & Conquer) =====
async function quickSortDC(arr, low = 0, high = arr.length - 1, speed) {
  return await quickSort(arr, low, high, speed);
}

// ===== Strassen's Matrix Multiplication =====
function strassenMultiply(A, B) {
  let n = A.length;
  if (n === 1) return [[A[0][0] * B[0][0]]];

  let half = n / 2;

  let [A11, A12, A21, A22] = splitMatrix(A, half);
  let [B11, B12, B21, B22] = splitMatrix(B, half);

  let M1 = strassenMultiply(addMatrix(A11, A22), addMatrix(B11, B22));
  let M2 = strassenMultiply(addMatrix(A21, A22), B11);
  let M3 = strassenMultiply(A11, subMatrix(B12, B22));
  let M4 = strassenMultiply(A22, subMatrix(B21, B11));
  let M5 = strassenMultiply(addMatrix(A11, A12), B22);
  let M6 = strassenMultiply(subMatrix(A21, A11), addMatrix(B11, B12));
  let M7 = strassenMultiply(subMatrix(A12, A22), addMatrix(B21, B22));

  let C11 = addMatrix(subMatrix(addMatrix(M1, M4), M5), M7);
  let C12 = addMatrix(M3, M5);
  let C21 = addMatrix(M2, M4);
  let C22 = addMatrix(subMatrix(addMatrix(M1, M3), M2), M6);

  return joinMatrix(C11, C12, C21, C22);
}

function splitMatrix(M, half) {
  let A11 = M.slice(0, half).map(row => row.slice(0, half));
  let A12 = M.slice(0, half).map(row => row.slice(half));
  let A21 = M.slice(half).map(row => row.slice(0, half));
  let A22 = M.slice(half).map(row => row.slice(half));
  return [A11, A12, A21, A22];
}
function addMatrix(A, B) {
  return A.map((row, i) => row.map((val, j) => val + B[i][j]));
}
function subMatrix(A, B) {
  return A.map((row, i) => row.map((val, j) => val - B[i][j]));
}
function joinMatrix(C11, C12, C21, C22) {
  let n = C11.length * 2;
  let C = Array.from({ length: n }, () => Array(n).fill(0));
  let half = n / 2;

  for (let i = 0; i < half; i++) {
    for (let j = 0; j < half; j++) {
      C[i][j] = C11[i][j];
      C[i][j + half] = C12[i][j];
      C[i + half][j] = C21[i][j];
      C[i + half][j + half] = C22[i][j];
    }
  }
  return C;
}

// ===== Karatsuba Multiplication =====
function karatsuba(x, y) {
  if (x < 10 || y < 10) return x * y;

  let m = Math.max(x.toString().length, y.toString().length);
  let m2 = Math.floor(m / 2);

  let high1 = Math.floor(x / Math.pow(10, m2));
  let low1 = x % Math.pow(10, m2);
  let high2 = Math.floor(y / Math.pow(10, m2));
  let low2 = y % Math.pow(10, m2);

  let z0 = karatsuba(low1, low2);
  let z1 = karatsuba(low1 + high1, low2 + high2);
  let z2 = karatsuba(high1, high2);

  return (z2 * Math.pow(10, 2 * m2)) +
         ((z1 - z2 - z0) * Math.pow(10, m2)) +
         z0;
}
