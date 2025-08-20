"use strict";

class recursionVisualizer {
    constructor(time) {
        this.time = parseInt(600 / time);
        this.container = document.querySelector(".array");
    }

    sleep = async () => new Promise(res => setTimeout(res, this.time));

    // FACTORIAL VISUALIZER
    async factorial(n, depth = 0) {
        let node = document.createElement("div");
        node.className = "s-cell";
        node.innerText = `factorial(${n})`;
        node.style.marginLeft = `${depth * 20}px`; // indent for recursion depth
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
