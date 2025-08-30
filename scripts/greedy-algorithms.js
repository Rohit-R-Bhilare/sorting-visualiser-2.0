// ================= GREEDY ALGORITHMS ================= //

// ===== Kruskal’s Algorithm (MST) =====
function kruskalMST(vertices, edges) {
  edges.sort((a, b) => a.weight - b.weight);

  let parent = Array(vertices).fill().map((_, i) => i);
  function find(x) {
    if (parent[x] !== x) parent[x] = find(parent[x]);
    return parent[x];
  }
  function union(x, y) {
    let rootX = find(x), rootY = find(y);
    if (rootX !== rootY) parent[rootY] = rootX;
  }

  let mst = [];
  for (let edge of edges) {
    if (find(edge.u) !== find(edge.v)) {
      mst.push(edge);
      union(edge.u, edge.v);
      addResultCard("Kruskal", `Edge (${edge.u}-${edge.v}) with weight ${edge.weight}`);
    }
  }
  return mst;
}

// ===== Prim’s Algorithm (MST) =====
function primMST(graph) {
  let V = graph.length;
  let key = Array(V).fill(Infinity);
  let parent = Array(V).fill(-1);
  let mstSet = Array(V).fill(false);
  key[0] = 0;

  for (let count = 0; count < V - 1; count++) {
    let u = minKey(key, mstSet);
    mstSet[u] = true;

    for (let v = 0; v < V; v++) {
      if (graph[u][v] && !mstSet[v] && graph[u][v] < key[v]) {
        parent[v] = u;
        key[v] = graph[u][v];
        addResultCard("Prim", `Include edge (${u}-${v}) with weight ${graph[u][v]}`);
      }
    }
  }
  return parent;
}
function minKey(key, mstSet) {
  let min = Infinity, minIndex = -1;
  for (let v = 0; v < key.length; v++) {
    if (!mstSet[v] && key[v] < min) {
      min = key[v];
      minIndex = v;
    }
  }
  return minIndex;
}

// ===== Dijkstra’s Algorithm (Shortest Path) =====
function dijkstra(graph, src) {
  let V = graph.length;
  let dist = Array(V).fill(Infinity);
  let visited = Array(V).fill(false);
  dist[src] = 0;

  for (let count = 0; count < V - 1; count++) {
    let u = minDistance(dist, visited);
    visited[u] = true;

    for (let v = 0; v < V; v++) {
      if (!visited[v] && graph[u][v] !== 0 && dist[u] + graph[u][v] < dist[v]) {
        dist[v] = dist[u] + graph[u][v];
        addResultCard("Dijkstra", `Update distance of ${v} to ${dist[v]}`);
      }
    }
  }
  return dist;
}
function minDistance(dist, visited) {
  let min = Infinity, minIndex = -1;
  for (let v = 0; v < dist.length; v++) {
    if (!visited[v] && dist[v] <= min) {
      min = dist[v];
      minIndex = v;
    }
  }
  return minIndex;
}

// ===== Huffman Encoding =====
class HuffmanNode {
  constructor(char, freq) {
    this.char = char;
    this.freq = freq;
    this.left = null;
    this.right = null;
  }
}
function huffmanEncoding(freqMap) {
  let pq = [];
  for (let char in freqMap) pq.push(new HuffmanNode(char, freqMap[char]));
  pq.sort((a, b) => a.freq - b.freq);

  while (pq.length > 1) {
    let left = pq.shift();
    let right = pq.shift();
    let merged = new HuffmanNode(null, left.freq + right.freq);
    merged.left = left;
    merged.right = right;
    pq.push(merged);
    pq.sort((a, b) => a.freq - b.freq);
    addResultCard("Huffman", `Merge nodes with freq ${left.freq} & ${right.freq}`);
  }

  let codes = {};
  generateCodes(pq[0], "", codes);
  return codes;
}
function generateCodes(node, code, codes) {
  if (!node) return;
  if (node.char !== null) codes[node.char] = code;
  generateCodes(node.left, code + "0", codes);
  generateCodes(node.right, code + "1", codes);
}

// ===== Activity Selection Problem =====
function activitySelection(activities) {
  activities.sort((a, b) => a.finish - b.finish);
  let result = [activities[0]];
  let lastFinish = activities[0].finish;

  for (let i = 1; i < activities.length; i++) {
    if (activities[i].start >= lastFinish) {
      result.push(activities[i]);
      lastFinish = activities[i].finish;
      addResultCard("Activity Selection", `Select activity (${activities[i].start}, ${activities[i].finish})`);
    }
  }
  return result;
}

// ===== Fractional Knapsack =====
function fractionalKnapsack(items, capacity) {
  items.sort((a, b) => (b.value / b.weight) - (a.value / a.weight));
  let totalValue = 0;

  for (let i = 0; i < items.length; i++) {
    if (capacity >= items[i].weight) {
      capacity -= items[i].weight;
      totalValue += items[i].value;
      addResultCard("Knapsack", `Take whole item (w=${items[i].weight}, v=${items[i].value})`);
    } else {
      let fraction = capacity / items[i].weight;
      totalValue += items[i].value * fraction;
      addResultCard("Knapsack", `Take ${Math.round(fraction * 100)}% of item (w=${items[i].weight}, v=${items[i].value})`);
      break;
    }
  }
  return totalValue;
}
