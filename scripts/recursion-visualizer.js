"use strict";

class recursionVisualizer {
  constructor(time) {
    this.time = parseInt(600 / time);
    this.container = document.querySelector(".array");
  }

  sleep = async () => new Promise((res) => setTimeout(res, this.time));

  async factorial(n, depth = 0) {
    recCalls++;
    document.getElementById("recCalls").innerText = recCalls;

    let node = document.createElement("div");
    node.className = "s-cell recursion";
    node.style.marginLeft = `${depth * 30}px`;
    node.innerText = `factorial(${n})`;
    this.container.appendChild(node);

    await this.sleep();

    if (n === 1) {
      node.innerText += " = 1";
      return 1;
    }

    let result = n * (await this.factorial(n - 1, depth + 1));
    node.innerText += ` = ${result}`;
    return result;
  }
}
