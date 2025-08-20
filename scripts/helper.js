"use strict";

class Helper {
  constructor(time, list = []) {
    this.time = parseInt(400 / time);
    this.list = list; // bars
    this.boxes = document.querySelectorAll(".s-cell"); // boxes
  }

  // ------------------- General Pause -------------------
  pause = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, this.time);
    });
  };

  // ------------------- Marking for Sorting (bars) -------------------
  mark = async (index) => {
    this.list[index].setAttribute("class", "cell current");
  };

  markSpl = async (index) => {
    this.list[index].setAttribute("class", "cell min");
  };

  unmark = async (index) => {
    this.list[index].setAttribute("class", "cell");
  };

  // ------------------- Compare for Sorting -------------------
  compare = async (index1, index2) => {
    await this.pause();
    let value1 = Number(this.list[index1].getAttribute("value"));
    let value2 = Number(this.list[index2].getAttribute("value"));
    return value1 > value2;
  };

  // ------------------- Swap for Sorting -------------------
  swap = async (index1, index2) => {
    await this.pause();
    let value1 = this.list[index1].getAttribute("value");
    let value2 = this.list[index2].getAttribute("value");

    // swap in bar view
    this.list[index1].setAttribute("value", value2);
    this.list[index1].style.height = `${3.8 * value2}px`;
    this.list[index2].setAttribute("value", value1);
    this.list[index2].style.height = `${3.8 * value1}px`;

    // swap in box view (if available)
    if (this.boxes.length) {
      let temp = this.boxes[index1].innerText;
      this.boxes[index1].innerText = this.boxes[index2].innerText;
      this.boxes[index2].innerText = temp;

      let tempVal = this.boxes[index1].getAttribute("value");
      this.boxes[index1].setAttribute("value", this.boxes[index2].getAttribute("value"));
      this.boxes[index2].setAttribute("value", tempVal);
    }
  };

  // ------------------- Searching Helpers (boxes) -------------------
  markBox = async (index) => {
    if (this.boxes.length) {
      this.boxes[index].classList.add("current");
    }
  };

  unmarkBox = async (index) => {
    if (this.boxes.length) {
      this.boxes[index].classList.remove("current");
    }
  };

  doneBox = async (index) => {
    if (this.boxes.length) {
      this.boxes[index].classList.remove("current");
      this.boxes[index].classList.add("done");
    }
  };

  failBox = async (index) => {
    if (this.boxes.length) {
      this.boxes[index].classList.remove("current");
      this.boxes[index].classList.add("fail");
    }
  };

  fadeLeft = async (limit) => {
    if (this.boxes.length) {
      for (let i = 0; i < limit; i++) {
        this.boxes[i].classList.add("fade");
      }
    }
  };

  fadeRight = async (limit) => {
    if (this.boxes.length) {
      for (let i = limit; i < this.boxes.length; i++) {
        this.boxes[i].classList.add("fade");
      }
    }
  };
}
