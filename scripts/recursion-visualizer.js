// ===== Recursion Visualizer =====
// Factorial using Recursion with Visualization

function runFactorial(n) {
  const container = document.querySelector(".array");
  container.innerHTML = "";
  incrementRecCalls(); // initial call

  const result = factorialVisualizer(n, container, 0);

  // Show final result at the bottom
  const finalBox = document.createElement("div");
  finalBox.classList.add("recursion");
  finalBox.style.background = "#10b981";
  finalBox.style.color = "white";
  finalBox.textContent = `Final Result: ${n}! = ${result}`;
  container.appendChild(finalBox);
}

// Recursive factorial with step-by-step visualization
function factorialVisualizer(n, container, depth) {
  incrementRecCalls();

  const step = document.createElement("div");
  step.classList.add("recursion");
  step.style.marginLeft = depth * 20 + "px";
  step.textContent = `factorial(${n}) called`;
  container.appendChild(step);

  // Base case
  if (n === 0 || n === 1) {
    const base = document.createElement("div");
    base.classList.add("recursion");
    base.style.marginLeft = (depth + 1) * 20 + "px";
    base.style.background = "#f59e0b";
    base.textContent = `return 1`;
    container.appendChild(base);
    return 1;
  }

  // Recursive call
  const result = n * factorialVisualizer(n - 1, container, depth + 1);

  const returnBox = document.createElement("div");
  returnBox.classList.add("recursion");
  returnBox.style.marginLeft = depth * 20 + "px";
  returnBox.style.background = "#3b82f6";
  returnBox.style.color = "white";
  returnBox.textContent = `return ${n} * factorial(${n - 1}) = ${result}`;
  container.appendChild(returnBox);

  return result;
}
