// ================= RECURSION & BACKTRACKING ================= //

// ===== Factorial (Recursion) =====
function factorialVisual(n) {
  updateRecursiveCalls();
  addRecursionStep(`Factorial(${n}) called`);

  if (n === 0 || n === 1) {
    addRecursionStep(`Return 1 (Base case)`, true);
    addResultCard("Factorial Result", `1`);
    return 1;
  }

  let result = n * factorialVisual(n - 1);
  addRecursionStep(`Return ${result} for Factorial(${n})`, true);
  if (n === numberInput) {
    addResultCard("Factorial Result", `${result}`);
  }
  return result;
}

// ===== Fibonacci (Recursion) =====
function fibonacciVisual(n) {
  updateRecursiveCalls();
  addRecursionStep(`Fibonacci(${n}) called`);

  if (n === 0) {
    addRecursionStep("Return 0 (Base case)", true);
    return 0;
  }
  if (n === 1) {
    addRecursionStep("Return 1 (Base case)", true);
    return 1;
  }

  let result = fibonacciVisual(n - 1) + fibonacciVisual(n - 2);
  addRecursionStep(`Return ${result} for Fibonacci(${n})`, true);
  if (n === numberInput) {
    addResultCard("Fibonacci Result", `${result}`);
  }
  return result;
}

// ===== Tower of Hanoi =====
function towerOfHanoi(n, fromRod, toRod, auxRod) {
  updateRecursiveCalls();
  addRecursionStep(`Move ${n} disk(s) from ${fromRod} → ${toRod}`);

  if (n === 1) {
    addRecursionStep(`Move disk 1 from ${fromRod} → ${toRod}`, true);
    return;
  }
  towerOfHanoi(n - 1, fromRod, auxRod, toRod);
  addRecursionStep(`Move disk ${n} from ${fromRod} → ${toRod}`, true);
  towerOfHanoi(n - 1, auxRod, toRod, fromRod);

  if (n === numberInput) {
    addResultCard("Tower of Hanoi", `Solved with ${Math.pow(2, n) - 1} moves`);
  }
}

// ===== N-Queens Problem =====
function solveNQueens(N) {
  let board = Array.from({ length: N }, () => Array(N).fill(0));
  if (!nQueensUtil(board, 0, N)) {
    addResultCard("N-Queens", "No solution exists");
    return false;
  }
  renderNQueens(board);
  addResultCard("N-Queens", "Solution Found!");
  return true;
}

function nQueensUtil(board, col, N) {
  if (col >= N) return true;

  for (let i = 0; i < N; i++) {
    if (isSafe(board, i, col, N)) {
      board[i][col] = 1;
      addRecursionStep(`Place Queen at (${i}, ${col})`);
      if (nQueensUtil(board, col + 1, N)) return true;
      board[i][col] = 0;
      addRecursionStep(`Backtrack: Remove Queen at (${i}, ${col})`);
    }
  }
  return false;
}

function isSafe(board, row, col, N) {
  for (let i = 0; i < col; i++) if (board[row][i] === 1) return false;
  for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) if (board[i][j] === 1) return false;
  for (let i = row, j = col; j >= 0 && i < N; i++, j--) if (board[i][j] === 1) return false;
  return true;
}

function renderNQueens(board) {
  const container = document.getElementById("results-cards");
  container.innerHTML = "";
  let grid = document.createElement("div");
  grid.className = "nqueens-grid";
  board.forEach(row => {
    row.forEach(cell => {
      let div = document.createElement("div");
      div.className = "nqueens-cell";
      if (cell === 1) div.classList.add("queen");
      grid.appendChild(div);
    });
  });
  container.appendChild(grid);
}

// ===== Rat in a Maze =====
function ratInMaze(maze, N) {
  let sol = Array.from({ length: N }, () => Array(N).fill(0));
  if (!ratMazeUtil(maze, 0, 0, sol, N)) {
    addResultCard("Rat in Maze", "No path found");
    return false;
  }
  renderMazeSolution(sol);
  addResultCard("Rat in Maze", "Path Found!");
  return true;
}

function ratMazeUtil(maze, x, y, sol, N) {
  updateRecursiveCalls();
  if (x === N - 1 && y === N - 1 && maze[x][y] === 1) {
    sol[x][y] = 1;
    return true;
  }
  if (isSafeMaze(maze, x, y, N)) {
    if (sol[x][y] === 1) return false;
    sol[x][y] = 1;
    addRecursionStep(`Move to (${x}, ${y})`);
    if (ratMazeUtil(maze, x + 1, y, sol, N)) return true;
    if (ratMazeUtil(maze, x, y + 1, sol, N)) return true;
    sol[x][y] = 0; // backtrack
    addRecursionStep(`Backtrack from (${x}, ${y})`);
    return false;
  }
  return false;
}

function isSafeMaze(maze, x, y, N) {
  return x >= 0 && y >= 0 && x < N && y < N && maze[x][y] === 1;
}

function renderMazeSolution(sol) {
  const container = document.getElementById("results-cards");
  container.innerHTML = "";
  let grid = document.createElement("div");
  grid.className = "maze-grid";
  sol.forEach(row => {
    row.forEach(cell => {
      let div = document.createElement("div");
      div.className = "maze-cell";
      if (cell === 1) div.classList.add("path");
      grid.appendChild(div);
    });
  });
  container.appendChild(grid);
}
