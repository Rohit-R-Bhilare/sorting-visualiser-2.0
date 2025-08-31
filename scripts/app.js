// app.js (updated, robust, works with the index.html you provided)

// ----------------------
// Helper / UI Utilities
// ----------------------
document.addEventListener("DOMContentLoaded", init);

function $(id) { return document.getElementById(id); }

function createCard(container, text, className = "rec-card") {
  const c = document.createElement("div");
  c.className = className;
  c.textContent = text;
  container.appendChild(c);
  return c;
}

function createResultCard(text) {
  return createCard($("results-cards"), text, "rec-card");
}

function createRecStep(text, done = false) {
  const card = createCard($("recursion-steps"), text, "rec-card");
  if (done) card.classList.add("done");
  return card;
}

function clearVisuals() {
  $("bars-container").innerHTML = "";
  $("dp-grid").innerHTML = "";
  $("recursion-steps").innerHTML = "";
  $("results-cards").innerHTML = "";
}

function sleep(ms) { return new Promise(res => setTimeout(res, ms)); }

// Metric helpers (keeps DOM in sync)
function resetMetrics() {
  $("comparisons").textContent = "0";
  $("swaps").textContent = "0";
  $("recursive-calls").textContent = "0";
  $("steps").textContent = "0";
}
function incMetric(id) {
  const el = $(id);
  if (!el) return;
  el.textContent = String(parseInt(el.textContent || "0", 10) + 1);
}

// Render bars (array → .bar elements)
function renderBarsFromArray(arr) {
  const container = $("bars-container");
  container.innerHTML = "";
  if (!arr || !arr.length) return;
  const max = Math.max(...arr);
  const containerW = container.clientWidth || 800;
  const width = Math.max(8, Math.floor((containerW - arr.length * 6) / arr.length));

  arr.forEach(val => {
    const bar = document.createElement("div");
    bar.className = "bar";
    bar.style.height = `${Math.max(6, Math.round((val / max) * 260)) }px`;
    bar.style.width = `${width}px`;
    bar.textContent = val;
    container.appendChild(bar);
  });
}

function getBarsNodeList() {
  return document.querySelectorAll("#bars-container .bar");
}

// ----------------------
// Algorithm registry
// keys used in the "algorithm" select dropdown map to function names
// ----------------------
const CATEGORY_ALGOS = {
  sorting: [
    { key: "bubble", name: "Bubble Sort", fn: "bubbleSort", type: "bars" },
    { key: "insertion", name: "Insertion Sort", fn: "insertionSort", type: "bars" },
    { key: "selection", name: "Selection Sort", fn: "selectionSort", type: "bars" },
    { key: "merge", name: "Merge Sort", fn: "mergeSort", type: "bars" },
    { key: "quick", name: "Quick Sort", fn: "quickSort", type: "bars" },
    { key: "heap", name: "Heap Sort", fn: "heapSort", type: "bars" },
    { key: "counting", name: "Counting Sort", fn: "countingSort", type: "bars" },
    { key: "radix", name: "Radix Sort", fn: "radixSort", type: "bars" }
  ],
  searching: [
    { key: "linear", name: "Linear Search", fn: "linearSearch", type: "search" },
    { key: "binary", name: "Binary Search", fn: "binarySearch", type: "search", requiresSorted: true },
    { key: "jump", name: "Jump Search", fn: "jumpSearch", type: "search", requiresSorted: true },
    { key: "exponential", name: "Exponential Search", fn: "exponentialSearch", type: "search", requiresSorted: true },
    { key: "interpolation", name: "Interpolation Search", fn: "interpolationSearch", type: "search", requiresSorted: true }
  ],
  recursion: [
    { key: "factorial", name: "Factorial (recursion)", fnCandidates: ["factorialVisual", "factorialRecursion","factorial"], type: "rec" },
    { key: "fibonacci", name: "Fibonacci (recursion)", fnCandidates: ["fibonacciVisual","fibonacciRecursion","fibonacci"], type: "rec" },
    { key: "hanoi", name: "Tower of Hanoi", fnCandidates: ["towerOfHanoi","towerOfHanoiVisual"], type: "rec" },
    { key: "nqueens", name: "N-Queens", fnCandidates: ["solveNQueens","nQueensVisual","nQueens"], type: "rec" },
    { key: "ratmaze", name: "Rat in a Maze", fnCandidates: ["ratInMaze","ratInMazeVisual","ratMaze"], type: "rec" }
  ],
  divide: [
    { key: "binarySearch", name: "Binary Search (rec)", fn: "binarySearchDC", type: "search" },
    { key: "merge", name: "Merge Sort", fn: "mergeSort", type: "bars" },
    { key: "quick", name: "Quick Sort", fn: "quickSort", type: "bars" },
    { key: "strassen", name: "Strassen Matrix Multiply", fnCandidates: ["strassenMultiply","strassenMultiplyVisual"], type: "matrix" },
    { key: "karatsuba", name: "Karatsuba", fnCandidates: ["karatsuba"], type: "math" }
  ],
  greedy: [
    { key: "kruskal", name: "Kruskal (MST)", fn: "kruskalMST", type: "graph" },
    { key: "prim", name: "Prim (MST)", fn: "primMST", type: "graph" },
    { key: "dijkstra", name: "Dijkstra", fn: "dijkstra", type: "graph" },
    { key: "huffman", name: "Huffman Encoding", fn: "huffmanEncoding", type: "tree" },
    { key: "activity", name: "Activity Selection", fn: "activitySelection", type: "greedy" },
    { key: "fractionalKnapsack", name: "Fractional Knapsack", fn: "fractionalKnapsack", type: "greedy" }
  ],
  dp: [
    { key: "fibDP", name: "Fibonacci DP", fn: "fibonacciDP", type: "dp" },
    { key: "lcs", name: "Longest Common Subsequence (LCS)", fn: "lcsDP", type: "dp" },
    { key: "lis", name: "Longest Increasing Subsequence (LIS)", fn: "lisDP", type: "dp" },
    { key: "matrixChain", name: "Matrix Chain Multiplication", fn: "matrixChainOrder", type: "dp" },
    { key: "knap01", name: "0/1 Knapsack", fnCandidates: ["knapsack01","knapSack","knapSack"], type: "dp" },
    { key: "coinChange", name: "Coin Change (Min coins)", fnCandidates: ["coinChangeMinCoins","coinChange"], type: "dp" },
    { key: "editDistance", name: "Edit Distance", fn: "editDistanceDP", type: "dp" },
    { key: "bellmanFord", name: "Bellman-Ford", fn: "bellmanFord", type: "dp" },
    { key: "floydWarshall", name: "Floyd-Warshall", fn: "floydWarshall", type: "dp" }
  ]
};

// ----------------------
// Initialization
// ----------------------
function init() {
  resetMetrics();
  clearVisuals();
  bindCategoryCards();
  $("start-btn").addEventListener("click", onStartClicked);
  $("reset-btn").addEventListener("click", onResetClicked);

  // By default hide controls section until a category is clicked
  $("controls-section").classList.add("hidden");
}

// Attach click handlers to category cards
function bindCategoryCards() {
  const cards = document.querySelectorAll(".algo-card");
  cards.forEach(card => {
    card.addEventListener("click", () => {
      // category is stored in data-category (per your index.html)
      const cat = card.dataset.category;
      if (!cat) return;
      showControlsForCategory(cat);
      $("controls-section").classList.remove("hidden");
      $("algo-title").textContent = card.querySelector("h3")?.textContent || card.textContent;
    });
  });
}

// ----------------------
// Build Controls UI
// ----------------------
let currentCategory = null;
let currentAlgoKey = null;

function showControlsForCategory(category) {
  currentCategory = category;
  const container = $("controls");
  container.innerHTML = "";

  const algos = CATEGORY_ALGOS[category];
  // algorithm select
  if (algos && algos.length) {
    const selWrap = document.createElement("div");
    selWrap.className = "control";
    const label = document.createElement("label");
    label.textContent = "Choose Algorithm";
    const select = document.createElement("select");
    select.id = "algo-select";
    algos.forEach(a => {
      const opt = document.createElement("option");
      opt.value = a.key;
      opt.textContent = a.name;
      select.appendChild(opt);
    });
    select.addEventListener("change", () => {
      currentAlgoKey = select.value;
      renderDynamicExtraControls(category, select.value);
    });
    selWrap.appendChild(label);
    selWrap.appendChild(select);
    container.appendChild(selWrap);
    // set default
    currentAlgoKey = algos[0].key;
  }

  // common controls: speed
  const speedWrap = document.createElement("div");
  speedWrap.className = "control";
  const speedLabel = document.createElement("label");
  speedLabel.textContent = "Speed (ms)";
  const speedInput = document.createElement("input");
  speedInput.type = "number";
  speedInput.id = "control-speed";
  speedInput.value = 200;
  speedInput.min = 10;
  speedInput.max = 2000;
  speedWrap.appendChild(speedLabel);
  speedWrap.appendChild(speedInput);
  container.appendChild(speedWrap);

  // now render extra controls for the current algoritmo immediately
  renderDynamicExtraControls(category, currentAlgoKey);
}

// depending on category + algorithm show different inputs
function renderDynamicExtraControls(category, algoKey) {
  // remove previous extras (but keep algo-select and speed)
  const container = $("controls");
  // remove elements except the select and speed control (simple approach)
  // rebuild: keep first two children (algo-select and speed) — safer if DOM layout changes
  // We'll clear everything and re-add select + speed + extras
  const origAlgos = CATEGORY_ALGOS[category] || [];
  container.innerHTML = "";

  // algorithm selector again
  const selWrap = document.createElement("div");
  selWrap.className = "control";
  const label = document.createElement("label");
  label.textContent = "Choose Algorithm";
  const select = document.createElement("select");
  select.id = "algo-select";
  origAlgos.forEach(a => {
    const opt = document.createElement("option");
    opt.value = a.key;
    opt.textContent = a.name;
    select.appendChild(opt);
  });
  select.value = algoKey || origAlgos[0].key;
  select.addEventListener("change", (e) => {
    currentAlgoKey = e.target.value;
    // re-render extras for this selection
    renderDynamicExtraControls(category, currentAlgoKey);
  });
  selWrap.appendChild(label);
  selWrap.appendChild(select);
  container.appendChild(selWrap);

  // speed control
  const speedWrap = document.createElement("div");
  speedWrap.className = "control";
  const speedLabel = document.createElement("label");
  speedLabel.textContent = "Speed (ms)";
  const speedInput = document.createElement("input");
  speedInput.type = "number";
  speedInput.id = "control-speed";
  speedInput.value = 200;
  speedInput.min = 10;
  speedInput.max = 2000;
  speedWrap.appendChild(speedLabel);
  speedWrap.appendChild(speedInput);
  container.appendChild(speedWrap);

  // extras depending on category
  if (category === "sorting") {
    // array size
    const sizeWrap = document.createElement("div");
    sizeWrap.className = "control";
    const lbl = document.createElement("label");
    lbl.textContent = "Array Size";
    const sizeInput = document.createElement("input");
    sizeInput.type = "number";
    sizeInput.id = "control-size";
    sizeInput.value = 20;
    sizeInput.min = 5; sizeInput.max = 200;
    sizeWrap.appendChild(lbl); sizeWrap.appendChild(sizeInput);
    container.appendChild(sizeWrap);
  } else if (category === "searching") {
    // array size + target value
    const sizeWrap = document.createElement("div");
    sizeWrap.className = "control";
    const lbl = document.createElement("label");
    lbl.textContent = "Array Size";
    const sizeInput = document.createElement("input");
    sizeInput.type = "number";
    sizeInput.id = "control-size";
    sizeInput.value = 30;
    sizeInput.min = 5; sizeInput.max = 200;
    sizeWrap.appendChild(lbl); sizeWrap.appendChild(sizeInput);
    container.appendChild(sizeWrap);

    const targetWrap = document.createElement("div");
    targetWrap.className = "control";
    const tLbl = document.createElement("label");
    tLbl.textContent = "Target Value";
    const tInput = document.createElement("input");
    tInput.type = "number";
    tInput.id = "control-target";
    tInput.placeholder = "value to search";
    targetWrap.appendChild(tLbl); targetWrap.appendChild(tInput);
    container.appendChild(targetWrap);
  } else if (category === "recursion") {
    const nWrap = document.createElement("div");
    nWrap.className = "control";
    const lbl = document.createElement("label");
    lbl.textContent = "Number / Size";
    const nInput = document.createElement("input");
    nInput.type = "number";
    nInput.id = "control-number";
    nInput.value = 5;
    nInput.min = 0; nInput.max = 20;
    nWrap.appendChild(lbl); nWrap.appendChild(nInput);
    container.appendChild(nWrap);

    // additional param for N-Queens / Maze: board size
    const boardWrap = document.createElement("div");
    boardWrap.className = "control";
    const bLbl = document.createElement("label");
    bLbl.textContent = "Board / Maze Size (N)";
    const bInput = document.createElement("input");
    bInput.type = "number";
    bInput.id = "control-board-size";
    bInput.value = 4;
    bInput.min = 2; bInput.max = 12;
    boardWrap.appendChild(bLbl); boardWrap.appendChild(bInput);
    container.appendChild(boardWrap);
  } else if (category === "dp") {
    // two string/array inputs for DP tasks
    const i1 = document.createElement("div"); i1.className = "control";
    const l1 = document.createElement("label"); l1.textContent = "Input A (string/CSV)";
    const in1 = document.createElement("input"); in1.type = "text"; in1.id = "control-input-a"; in1.placeholder = "e.g. abcde or 1,2,3";
    i1.appendChild(l1); i1.appendChild(in1); container.appendChild(i1);

    const i2 = document.createElement("div"); i2.className = "control";
    const l2 = document.createElement("label"); l2.textContent = "Input B (string/CSV)";
    const in2 = document.createElement("input"); in2.type = "text"; in2.id = "control-input-b"; in2.placeholder = "e.g. ace or 4,5";
    i2.appendChild(l2); i2.appendChild(in2); container.appendChild(i2);
  } else {
    // other categories: no extra controls for now
    const p = document.createElement("div");
    p.className = "control";
    p.textContent = "Choose an algorithm and press Start.";
    container.appendChild(p);
  }

  // ensure currentAlgoKey matches the selected value
  currentAlgoKey = select.value;
}

// ----------------------
// Start / Reset handlers
// ----------------------
let running = false;

async function onStartClicked() {
  if (running) return;
  running = true;
  $("start-btn").disabled = true;
  $("reset-btn").disabled = true;
  $("results-cards").innerHTML = "";
  $("recursion-steps").innerHTML = "";

  try {
    await runSelectedAlgorithm();
  } catch (err) {
    console.error("Algorithm run error:", err);
    createResultCard("Error running algorithm — see console");
  } finally {
    running = false;
    $("start-btn").disabled = false;
    $("reset-btn").disabled = false;
  }
}

function onResetClicked() {
  if (running) return;
  clearVisuals();
  resetMetrics();
}

// ----------------------
// Runner: adaptively call functions
// ----------------------
async function runSelectedAlgorithm() {
  if (!currentCategory) {
    createResultCard("Select a category first (click a card).");
    return;
  }

  const algos = CATEGORY_ALGOS[currentCategory] || [];
  const select = $("algo-select");
  const selectedKey = select ? select.value : (algos[0] && algos[0].key);
  const chosen = algos.find(a => a.key === selectedKey);
  if (!chosen) {
    createResultCard("No algorithm chosen (internal).");
    return;
  }

  const speed = parseInt($("control-speed")?.value || "200", 10);
  // handle per category
  if (currentCategory === "sorting") {
    const size = parseInt($("control-size")?.value || "20", 10);
    const arr = generateRandomArray(size);
    renderBarsFromArray(arr);
    const bars = getBarsNodeList();

    // find function
    const fn = resolveFunction(chosen);
    if (!fn) {
      createResultCard(`Sorting function for ${chosen.name} not found.`);
      return;
    }
    // call with bars + speed if possible, else try variants
    await safeCall(fn, [bars, speed, arr]);
    // after finishing mark bars green (if present)
    getBarsNodeList().forEach(b => b.classList.add("green"));
    return;
  }

  if (currentCategory === "searching") {
    let size = parseInt($("control-size")?.value || "30", 10);
    let arr = generateRandomArray(size);
    // if algorithm needs sorted input, sort
    if (chosen.requiresSorted) arr = arr.slice().sort((a,b)=>a-b);
    renderBarsFromArray(arr);
    const bars = getBarsNodeList();
    const target = parseInt($("control-target")?.value, 10);
    if (isNaN(target)) {
      createResultCard("Please enter a numeric target value.");
      return;
    }
    const fn = resolveFunction(chosen);
    if (!fn) {
      createResultCard(`Search function for ${chosen.name} not found.`);
      return;
    }
    await safeCall(fn, [bars, target, speed, arr]);
    return;
  }

  if (currentCategory === "recursion") {
    const n = parseInt($("control-number")?.value || "5", 10);
    const boardN = parseInt($("control-board-size")?.value || "4", 10);
    clearVisuals();
    // choose function
    const fn = resolveFunction(chosen);
    if (!fn) {
      createResultCard(`${chosen.name} implementation not found.`);
      return;
    }

    // Some recursion functions are synchronous (return value), some are async; we try both
    if (chosen.key === "factorial" || chosen.key === "fibonacci") {
      // try common names
      const res = await safeCall(fn, [n]);
      if (res !== undefined) createResultCard(`${chosen.name} result: ${res}`);
      return;
    }

    if (chosen.key === "hanoi") {
      // many tower functions accept (n, from, to, aux) — try that
      await safeCall(fn, [n, "A", "C", "B"]);
      // optionally show minimal moves
      createResultCard("Hanoi: minimal moves = " + (Math.pow(2, n) - 1));
      return;
    }

    if (chosen.key === "nqueens") {
      // try find functions that accept N
      await safeCall(fn, [boardN]);
      return;
    }

    if (chosen.key === "ratmaze") {
      // Many ratMaze implementations require the maze grid — try auto-generated simple maze
      // create a simple open maze (all 1s) of size boardN
      const maze = Array.from({length: boardN}, () => Array(boardN).fill(1));
      await safeCall(fn, [maze, boardN]);
      return;
    }

    // fallback
    await safeCall(fn, [n]);
    return;
  }

  if (currentCategory === "dp") {
    // many DP functions expect different inputs; attempt to parse sensible defaults
    const inputA = $("control-input-a")?.value || "";
    const inputB = $("control-input-b")?.value || "";
    const dpContainer = $("dp-grid");
    const fn = resolveFunction(chosen);
    if (!fn) { createResultCard(`${chosen.name} implementation not found.`); return; }

    // decide parameter passing heuristics:
    if (chosen.key === "fibDP") {
      const n = parseInt(inputA) || 10;
      await safeCall(fn, [n, parseInt($("control-speed")?.value || "120",10)]);
      return;
    }

    if (chosen.key === "lcs") {
      await safeCall(fn, [inputA || "ABCBDAB", inputB || "BDCABA", dpContainer, parseInt($("control-speed")?.value || "80",10)]);
      return;
    }

    if (chosen.key === "lis") {
      // parse comma separated numbers
      const arr = parseCSVorNumbers(inputA) || [10,22,9,33,21,50,41,60];
      await safeCall(fn, [arr, parseInt($("control-speed")?.value || "80",10)]);
      return;
    }

    if (chosen.key === "matrixChain") {
      // dims: e.g. "10,30,5,60"
      const dims = parseCSVorNumbers(inputA) || [10,30,5,60];
      await safeCall(fn, [dims, dpContainer, parseInt($("control-speed")?.value || "60",10)]);
      return;
    }

    if (chosen.key === "knap01") {
      // simple fallback: parse two CSVs: weights, values in inputs A and B, and capacity in speed field (!) — if none, use default
      const wt = parseCSVorNumbers(inputA) || [2,3,4,5];
      const val = parseCSVorNumbers(inputB) || [3,4,5,6];
      const W = parseInt($("control-speed")?.value) || Math.max(...wt) + 3;
      await safeCall(fn, [wt, val, W, dpContainer, parseInt($("control-speed")?.value || "60",10)]);
      return;
    }

    if (chosen.key === "coinChange") {
      const coins = parseCSVorNumbers(inputA) || [1,3,4];
      const amount = parseInt(inputB) || 6;
      await safeCall(fn, [coins, amount, dpContainer, parseInt($("control-speed")?.value || "60",10)]);
      return;
    }

    if (chosen.key === "editDistance") {
      await safeCall(fn, [inputA || "kitten", inputB || "sitting", dpContainer, parseInt($("control-speed")?.value || "70",10)]);
      return;
    }

    // generic fallthrough: try calling with both inputs + container if present
    await safeCall(fn, [inputA, inputB, dpContainer, parseInt($("control-speed")?.value || "80",10)]);
    return;
  }

  if (currentCategory === "greedy" || currentCategory === "divide") {
    const fn = resolveFunction(chosen);
    if (!fn) {
      createResultCard(`${chosen.name} not implemented in scripts.`);
      return;
    }
    // Many greedy/divide functions expect data structures (graphs, arrays...). We will try minimal sensible defaults.
    if (chosen.key === "kruskal" || chosen.key === "prim" || chosen.key === "dijkstra") {
      // small default graph
      const nodes = [0,1,2,3];
      const edges = [
        {u:0,v:1,weight:1}, {u:1,v:2,weight:2}, {u:0,v:2,weight:4}, {u:2,v:3,weight:1}
      ];
      await safeCall(fn, [nodes, edges, $("results-cards"), parseInt($("control-speed")?.value || "120",10)]);
      return;
    }
    // fallback: call with no args or with small sample args
    await safeCall(fn, []);
    return;
  }

  // fallback - shouldn't reach here
  createResultCard("Category not handled by runner yet.");
}

// ----------------------
// Utilities used by runner
// ----------------------
function resolveFunction(algoDescriptor) {
  if (!algoDescriptor) return null;
  // if descriptor has fn property (string), try to find it
  if (algoDescriptor.fn) {
    const name = algoDescriptor.fn;
    if (typeof window[name] === "function") return window[name];
  }
  // try fnCandidates (array of possible names)
  if (algoDescriptor.fnCandidates && Array.isArray(algoDescriptor.fnCandidates)) {
    for (const n of algoDescriptor.fnCandidates) {
      if (typeof window[n] === "function") return window[n];
    }
  }
  // try by key name directly
  if (typeof window[algoDescriptor.key] === "function") return window[algoDescriptor.key];
  // try common fallback names (make a few guesses)
  const guesses = [
    algoDescriptor.fn,
    algoDescriptor.key,
    "run" + (algoDescriptor.fn ? capitalize(algoDescriptor.fn) : capitalize(algoDescriptor.key))
  ].filter(Boolean);
  for (const g of guesses) {
    if (typeof window[g] === "function") return window[g];
  }
  return null;
}

function capitalize(s) { return String(s || "").charAt(0).toUpperCase() + String(s || "").slice(1); }

// Attempt to call target function with multiple sensible parameter patterns
async function safeCall(fn, argOptions = []) {
  if (typeof fn !== "function") throw new Error("Not a function");
  try {
    // Always try to await the call (fn may be sync or async)
    const result = fn.apply(null, argOptions);
    // if returns a Promise await it
    if (result instanceof Promise) return await result;
    return result;
  } catch (err) {
    // As a fallback, try calling with fewer params (0,1,2)
    try {
      const tryArgs = argOptions.slice(0, 2);
      const res2 = fn.apply(null, tryArgs);
      if (res2 instanceof Promise) return await res2;
      return res2;
    } catch (err2) {
      console.error("safeCall failed for", fn.name, err2);
      throw err2;
    }
  }
}

// small utility to parse CSV/space-separated numeric input into array of numbers
function parseCSVorNumbers(text) {
  if (!text) return null;
  // try to detect comma-separated numbers
  const cleaned = text.trim();
  if (cleaned.includes(",")) {
    return cleaned.split(",").map(s => Number(s.trim())).filter(n => !isNaN(n));
  }
  if (cleaned.includes(" ")) {
    return cleaned.split(/\s+/).map(s => Number(s.trim())).filter(n => !isNaN(n));
  }
  // single number
  const n = Number(cleaned);
  return isNaN(n) ? null : [n];
}

function generateRandomArray(size = 20, max = 100) {
  size = Math.max(2, Math.min(500, Math.floor(size) || 20));
  const arr = Array.from({length: size}, () => Math.floor(Math.random() * max) + 1);
  return arr;
}

// ----------------------
// End of file
// ----------------------
