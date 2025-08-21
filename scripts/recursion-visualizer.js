// ====== Recursion Visualizer (Factorial) ======

async function factorialVisualizer(n, depth = 0) {
  incrementRecCalls();

  // Create a step element
  const step = document.createElement("div");
  step.classList.add("recursion");
  step.textContent = `Call: factorial(${n})`;
  document.querySelector(".array").appendChild(step);

  await sleep(500);

  if (n === 1) {
    const base = document.createElement("div");
    base.classList.add("recursion");
    base.textContent = `Return: factorial(1) = 1`;
    document.querySelector(".array").appendChild(base);
    return 1;
  }

  // Recursive call
  const result = await factorialVisualizer(n - 1, depth + 1);

  const ret = document.createElement("div");
  ret.classList.add("recursion");
  ret.textContent = `Return: factorial(${n}) = ${n} * ${result} = ${n * result}`;
  document.querySelector(".array").appendChild(ret);

  await sleep(500);

  return n * result;
}
