// ===== Recursion Visualizer =====

// Factorial Visualizer
async function factorialVisualizer(n, depth = 0) {
  showRecursionStep(`factorial(${n}) called`, depth);
  await sleep(2);

  if (n === 0 || n === 1) {
    showRecursionStep(`return 1`, depth);
    return 1;
  }

  let result = n * (await factorialVisualizer(n - 1, depth + 1));
  showRecursionStep(`return ${result}`, depth);
  return result;
}

// Fibonacci Visualizer
async function fibonacciVisualizer(n, depth = 0) {
  showRecursionStep(`fibonacci(${n}) called`, depth);
  await sleep(2);

  if (n === 0) {
    showRecursionStep(`return 0`, depth);
    return 0;
  }
  if (n === 1) {
    showRecursionStep(`return 1`, depth);
    return 1;
  }

  let left = await fibonacciVisualizer(n - 1, depth + 1);
  let right = await fibonacciVisualizer(n - 2, depth + 1);

  let result = left + right;
  showRecursionStep(`return ${result}`, depth);
  return result;
}
