"use strict";

class searchAlgorithms {
  constructor(time) {
    this.boxes = document.querySelectorAll(".s-cell");
    this.size = this.boxes.length;
    this.time = time;
    this.help = new Helper(this.time, []); // reuse helper for effects
  }

  sleep = async () => new Promise((res) => setTimeout(res, this.time * 200));

  // ------------------- LINEAR SEARCH -------------------
  LinearSearch = async (target) => {
    for (let i = 0; i < this.size; i++) {
      await this.help.markBox(i);
      await this.sleep();

      let value = Number(this.boxes[i].getAttribute("value"));
      if (value === target) {
        await this.help.doneBox(i);
        return i;
      }

      await this.help.failBox(i);
      await this.help.unmarkBox(i);
    }
    alert("Element not found!");
    return -1;
  };

  // ------------------- BINARY SEARCH -------------------
  BinarySearch = async (target) => {
    let left = 0,
      right = this.size - 1;

    while (left <= right) {
      let mid = Math.floor((left + right) / 2);
      await this.help.markBox(mid);
      await this.sleep();

      let value = Number(this.boxes[mid].getAttribute("value"));

      if (value === target) {
        await this.help.doneBox(mid);
        return mid;
      }

      if (value < target) {
        // fade left half
        await this.help.fadeLeft(mid + 1);
        left = mid + 1;
      } else {
        // fade right half
        await this.help.fadeRight(mid);
        right = mid - 1;
      }

      await this.help.unmarkBox(mid);
    }

    alert("Element not found!");
    return -1;
  };
}
