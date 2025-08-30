// ====== Helper Functions for Visualization ======

// Sleep / Delay
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ====== Metrics Updates ======
function updateComparisons() {
  let el = document.getElementById("comparisons");
  el.textContent = parseInt(el.textContent) + 1;
}
function updateSwaps() {
  let el = document.getElementById("swaps");
  el.textContent = parseInt(el.textContent) + 1;
}
function updateRecursiveCalls() {
  let el = document.getElementById("recursive-calls");
  el.textContent = parseInt(el.textContent) + 1;
}
function updateSteps() {
  let el = document.getElementById("steps");
  el.textContent = parseInt(el.textContent) + 1;
}

// ====== Array Bar Helpers ======
function colorBar(bar, color) {
  bar.classList.remove("green", "red", "orange");
  bar.classList.add(color);
}
function resetBars(bars) {
  bars.forEach(bar => {
    bar.classList.remove("green", "red", "orange");
  });
}

// ====== DP Table Helpers ======
function createDPGrid(rows, cols, container) {
  container.innerHTML = "";
  for (let i = 0; i < rows; i++) {
    const row = document.createElement("div");
    row.className = "matrix-row";
    for (let j = 0; j < cols; j++) {
      const cell = document.createElement("div");
      cell.className = "matrix-cell";
      cell.id = `cell-${i}-${j}`;
      cell.textContent = "0";
      row.appendChild(cell);
    }
    container.appendChild(row);
  }
}
function updateDPCell(i, j, val, highlight = false) {
  let cell = document.getElementById(`cell-${i}-${j}`);
  if (cell) {
    cell.textContent = val;
    if (highlight) {
      cell.classList.add("matrix-cell-hi");
      setTimeout(() => cell.classList.remove("matrix-cell-hi"), 600);
    }
  }
}

// ====== Recursion Helpers ======
function createRecursionCard(text, done = false) {
  const card = document.createElement("div");
  card.className = "rec-card";
  if (done) card.classList.add("done");
  card.textContent = text;
  return card;
}
function addRecursionStep(text, done = false) {
  let container = document.getElementById("recursion-steps");
  container.appendChild(createRecursionCard(text, done));
}

// For results (factorial, Fibonacci, etc.)
function addResultCard(title, value) {
  const card = document.createElement("div");
  card.className = "rec-card";
  card.innerHTML = `<strong>${title}</strong><br/>${value}`;
  document.getElementById("results-cards").appendChild(card);
}

// ====== Graph Helpers ======
function drawGraph(nodes, edges, canvasId = "graph-canvas") {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw edges
  ctx.strokeStyle = "#888";
  ctx.lineWidth = 2;
  edges.forEach(([u, v]) => {
    ctx.beginPath();
    ctx.moveTo(nodes[u].x, nodes[u].y);
    ctx.lineTo(nodes[v].x, nodes[v].y);
    ctx.stroke();
  });

  // Draw nodes
  nodes.forEach((node, i) => {
    ctx.beginPath();
    ctx.arc(node.x, node.y, 20, 0, Math.PI * 2);
    ctx.fillStyle = "#2196F3";
    ctx.fill();
    ctx.strokeStyle = "#000";
    ctx.stroke();

    ctx.fillStyle = "#fff";
    ctx.font = "14px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(i, node.x, node.y);
  });
}
