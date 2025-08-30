// ================= DYNAMIC PROGRAMMING (DP) ================= //

// ===== Fibonacci (DP - Bottom Up) =====
function fibonacciDP(n) {
  let dp = [0, 1];
  addResultCard("DP Fibonacci", `dp[0] = 0, dp[1] = 1`);

  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
    addResultCard("DP Fibonacci", `dp[${i}] = ${dp[i - 1]} + ${dp[i - 2]} = ${dp[i]}`);
  }
  return dp[n];
}

// ===== Longest Common Subsequence (LCS) =====
function LCS(X, Y) {
  let m = X.length, n = Y.length;
  let dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (X[i - 1] === Y[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
        addResultCard("LCS", `dp[${i}][${j}] = ${dp[i][j]} (match ${X[i - 1]})`);
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        addResultCard("LCS", `dp[${i}][${j}] = ${dp[i][j]} (no match)`);
      }
    }
  }
  addResultCard("LCS Result", `Length = ${dp[m][n]}`);
  return dp[m][n];
}

// ===== Longest Increasing Subsequence (LIS) =====
function LIS(arr) {
  let n = arr.length;
  let dp = Array(n).fill(1);

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (arr[i] > arr[j]) dp[i] = Math.max(dp[i], dp[j] + 1);
    }
    addResultCard("LIS", `dp[${i}] = ${dp[i]}`);
  }
  let result = Math.max(...dp);
  addResultCard("LIS Result", `Length = ${result}`);
  return result;
}

// ===== Matrix Chain Multiplication =====
function matrixChainOrder(p) {
  let n = p.length;
  let dp = Array.from({ length: n }, () => Array(n).fill(0));

  for (let L = 2; L < n; L++) {
    for (let i = 1; i < n - L + 1; i++) {
      let j = i + L - 1;
      dp[i][j] = Infinity;
      for (let k = i; k <= j - 1; k++) {
        let q = dp[i][k] + dp[k + 1][j] + p[i - 1] * p[k] * p[j];
        if (q < dp[i][j]) {
          dp[i][j] = q;
          addResultCard("Matrix Chain", `dp[${i}][${j}] = ${q}`);
        }
      }
    }
  }
  addResultCard("Matrix Chain Result", `Min multiplications = ${dp[1][n - 1]}`);
  return dp[1][n - 1];
}

// ===== 0/1 Knapsack =====
function knapSack(W, wt, val, n) {
  let dp = Array.from({ length: n + 1 }, () => Array(W + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let w = 1; w <= W; w++) {
      if (wt[i - 1] <= w) {
        dp[i][w] = Math.max(val[i - 1] + dp[i - 1][w - wt[i - 1]], dp[i - 1][w]);
        addResultCard("Knapsack", `dp[${i}][${w}] = ${dp[i][w]}`);
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }
  addResultCard("Knapsack Result", `Max value = ${dp[n][W]}`);
  return dp[n][W];
}

// ===== Coin Change Problem =====
function coinChange(coins, amount) {
  let dp = Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  for (let i = 1; i <= amount; i++) {
    for (let c of coins) {
      if (i - c >= 0) {
        dp[i] = Math.min(dp[i], 1 + dp[i - c]);
        addResultCard("Coin Change", `dp[${i}] = ${dp[i]}`);
      }
    }
  }
  let result = dp[amount] === Infinity ? -1 : dp[amount];
  addResultCard("Coin Change Result", `Min coins = ${result}`);
  return result;
}

// ===== Edit Distance (Levenshtein) =====
function editDistance(str1, str2) {
  let m = str1.length, n = str2.length;
  let dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) {
    for (let j = 0; j <= n; j++) {
      if (i === 0) dp[i][j] = j;
      else if (j === 0) dp[i][j] = i;
      else if (str1[i - 1] === str2[j - 1]) dp[i][j] = dp[i - 1][j - 1];
      else dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);

      addResultCard("Edit Distance", `dp[${i}][${j}] = ${dp[i][j]}`);
    }
  }
  addResultCard("Edit Distance Result", `Distance = ${dp[m][n]}`);
  return dp[m][n];
}

// ===== Bellman-Ford Algorithm =====
function bellmanFord(V, edges, src) {
  let dist = Array(V).fill(Infinity);
  dist[src] = 0;

  for (let i = 1; i < V; i++) {
    for (let [u, v, w] of edges) {
      if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
        addResultCard("Bellman-Ford", `dist[${v}] = ${dist[v]}`);
      }
    }
  }
  addResultCard("Bellman-Ford Result", `Distances: ${dist}`);
  return dist;
}

// ===== Floyd-Warshall Algorithm =====
function floydWarshall(graph) {
  let V = graph.length;
  let dist = graph.map(row => row.slice());

  for (let k = 0; k < V; k++) {
    for (let i = 0; i < V; i++) {
      for (let j = 0; j < V; j++) {
        if (dist[i][k] + dist[k][j] < dist[i][j]) {
          dist[i][j] = dist[i][k] + dist[k][j];
          addResultCard("Floyd-Warshall", `dist[${i}][${j}] = ${dist[i][j]}`);
        }
      }
    }
  }
  addResultCard("Floyd-Warshall Result", `All pairs shortest path computed`);
  return dist;
}
