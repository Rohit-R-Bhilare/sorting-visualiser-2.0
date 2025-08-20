"use strict";

class Helper {
  constructor(time, list) {
    this.time = parseInt(600 / time);
    this.list = list;
  }

  pause = async () => new Promise((res) => setTimeout(res, this.time));

  async swap(i, j) {
    swaps++;
    document.getElementById("swaps").innerText = swaps;

    let ivalue = this.list[i].getAttribute("value");
    let jvalue = this.list[j].getAttribute("value");

    this.list[i].setAttribute("value", jvalue);
    this.list[j].setAttribute("value", ivalue);

    this.list[i].style.height = `${3.5 * jvalue}px`;
    this.list[j].style.height = `${3.5 * ivalue}px`;

    await this.pause();
  }

  async compare(i, j) {
    comparisons++;
    document.getElementById("comparisons").innerText = comparisons;

    let ivalue = Number(this.list[i].getAttribute("value"));
    let jvalue = Number(this.list[j].getAttribute("value"));
    return ivalue > jvalue;
  }

  async mark(i) {
    this.list[i].setAttribute("class", "cell current");
    await this.pause();
  }
  async unmark(i) {
    this.list[i].setAttribute("class", "cell");
  }
  async markSpl(i) {
    this.list[i].setAttribute("class", "cell special");
    await this.pause();
  }
}
