"use strict";

class recursionVisualizer {
  constructor(time) {
    this.time = parseInt(600 / time);
    this.container = document.querySelector(".array");
  }

  // Pause for animation
  sleep = async () => new Promise((res) => setTimeout(res, this.time));

  // FACTORIAL VISUALIZER
  async factorial(n, depth = 0) {
    // create a node for this recursion call
    let node = document.createElement("div");
    node.className = "s-cell recursion";
    node.style.marginLeft = `${depth * 30}px`; // indent based on recursion depth
    node.innerText = `factorial(${n})`;
    this.container.appendChild(node);

    await this.sleep();

    // base case
    if (n === 1) {
      node.innerText += " = 1";
      return 1;
    }

    // recursive call (factorial(n-1))
    let result = n * (await this.factorial(n - 1, depth + 1));

    // update current node after recursive return
    node.innerText += ` = ${result}`;
    return result;
  }
}
