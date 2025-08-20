"use strict";

class searchAlgorithms {
  constructor(time) {
    this.time = parseInt(600 / time);
    this.container = document.querySelector(".array");
    this.boxes = document.querySelectorAll(".s-cell");
  }

  sleep = async () => new Promise((res) => setTimeout(res, this.time));

  async LinearSearch(target) {
    for (let i = 0; i < this.boxes.length; i++) {
      comparisons++;
      document.getElementById("comparisons").innerText = comparisons;

      this.boxes[i].classList.add("current");
      await this.sleep();

      if (parseInt(this.boxes[i].innerText) === target) {
        this.boxes[i].classList.remove("current");
        this.boxes[i].classList.add("done");
        return i;
      } else {
        this.boxes[i].classList.remove("current");
        this.boxes[i].classList.add("fail");
      }
    }
    return -1;
  }

  async BinarySearch(target) {
    let low = 0, high = this.boxes.length - 1;
    while (low <= high) {
      let mid = Math.floor((low + high) / 2);

      comparisons++;
      document.getElementById("comparisons").innerText = comparisons;

      this.boxes[mid].classList.add("current");
      await this.sleep();

      let val = parseInt(this.boxes[mid].innerText);
      if (val === target) {
        this.boxes[mid].classList.remove("current");
        this.boxes[mid].classList.add("done");
        return mid;
      } else if (val < target) {
        this.boxes[mid].classList.remove("current");
        this.boxes[mid].classList.add("fail");
        for (let i = low; i <= mid; i++) this.boxes[i].classList.add("fade");
        low = mid + 1;
      } else {
        this.boxes[mid].classList.remove("current");
        this.boxes[mid].classList.add("fail");
        for (let i = mid; i <= high; i++) this.boxes[i].classList.add("fade");
        high = mid - 1;
      }
    }
    return -1;
  }
}
