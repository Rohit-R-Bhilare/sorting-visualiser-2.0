"use strict";

class sortAlgorithms {
  constructor(time) {
    this.list = document.querySelectorAll(".cell"); // bars
    this.size = this.list.length;
    this.time = time;
    this.help = new Helper(this.time, this.list);
    this.boxes = document.querySelectorAll(".s-cell"); // boxes
  }

  // ------------------- UTILITY -------------------
  async markBox(i, cls = "current") {
    if (this.boxes.length) this.boxes[i].classList.add(cls);
  }
  async unmarkBox(i, cls = "current") {
    if (this.boxes.length) this.boxes[i].classList.remove(cls);
  }
  async doneBox(i) {
    if (this.boxes.length) {
      this.boxes[i].classList.remove("current");
      this.boxes[i].classList.add("done");
    }
  }

  // ------------------- BUBBLE SORT -------------------
  BubbleSort = async () => {
    for (let i = 0; i < this.size - 1; ++i) {
      for (let j = 0; j < this.size - i - 1; ++j) {
        await this.help.mark(j);
        await this.help.mark(j + 1);

        await this.markBox(j);
        await this.markBox(j + 1);

        if (await this.help.compare(j, j + 1)) {
          await this.help.swap(j, j + 1);

          // also swap boxes
          let tmp = this.boxes[j].innerText;
          this.boxes[j].innerText = this.boxes[j + 1].innerText;
          this.boxes[j + 1].innerText = tmp;

          this.boxes[j].classList.add("swap");
          this.boxes[j + 1].classList.add("swap");
          await this.help.pause();
          this.boxes[j].classList.remove("swap");
          this.boxes[j + 1].classList.remove("swap");
        }

        await this.help.unmark(j);
        await this.help.unmark(j + 1);
        await this.unmarkBox(j);
        await this.unmarkBox(j + 1);
      }
      this.list[this.size - i - 1].setAttribute("class", "cell done");
      await this.doneBox(this.size - i - 1);
    }
    this.list[0].setAttribute("class", "cell done");
    await this.doneBox(0);
  };

  // ------------------- INSERTION SORT -------------------
  InsertionSort = async () => {
    for (let i = 0; i < this.size - 1; ++i) {
      let j = i;
      while (j >= 0 && (await this.help.compare(j, j + 1))) {
        await this.help.mark(j);
        await this.help.mark(j + 1);
        await this.markBox(j);
        await this.markBox(j + 1);

        await this.help.swap(j, j + 1);

        let tmp = this.boxes[j].innerText;
        this.boxes[j].innerText = this.boxes[j + 1].innerText;
        this.boxes[j + 1].innerText = tmp;

        await this.help.unmark(j);
        await this.help.unmark(j + 1);
        await this.unmarkBox(j);
        await this.unmarkBox(j + 1);
        j -= 1;
      }
    }
    for (let counter = 0; counter < this.size; ++counter) {
      this.list[counter].setAttribute("class", "cell done");
      await this.doneBox(counter);
    }
  };

  // ------------------- SELECTION SORT -------------------
  SelectionSort = async () => {
    for (let i = 0; i < this.size; ++i) {
      let minIndex = i;
      for (let j = i; j < this.size; ++j) {
        await this.help.markSpl(minIndex);
        await this.help.mark(j);
        await this.markBox(minIndex, "min");
        await this.markBox(j);

        if (await this.help.compare(minIndex, j)) {
          await this.help.unmark(minIndex);
          await this.unmarkBox(minIndex, "min");
          minIndex = j;
        }
        await this.help.unmark(j);
        await this.unmarkBox(j);
        await this.markBox(minIndex, "min");
      }

      await this.help.mark(minIndex);
      await this.help.mark(i);

      await this.markBox(minIndex);
      await this.markBox(i);

      await this.help.swap(minIndex, i);

      let tmp = this.boxes[minIndex].innerText;
      this.boxes[minIndex].innerText = this.boxes[i].innerText;
      this.boxes[i].innerText = tmp;

      await this.help.unmark(minIndex);
      await this.help.unmark(i);
      await this.unmarkBox(minIndex);
      await this.unmarkBox(i);

      this.list[i].setAttribute("class", "cell done");
      await this.doneBox(i);
    }
  };

  // ------------------- MERGE SORT -------------------
  MergeSort = async () => {
    await this.MergeDivider(0, this.size - 1);
    for (let counter = 0; counter < this.size; ++counter) {
      this.list[counter].setAttribute("class", "cell done");
      await this.doneBox(counter);
    }
  };

  MergeDivider = async (start, end) => {
    if (start < end) {
      let mid = start + Math.floor((end - start) / 2);
      await this.MergeDivider(start, mid);
      await this.MergeDivider(mid + 1, end);
      await this.Merge(start, mid, end);
    }
  };

  Merge = async (start, mid, end) => {
    let newList = [];
    let front = start;
    let back = mid + 1;

    while (front <= mid && back <= end) {
      let fvalue = Number(this.list[front].getAttribute("value"));
      let bvalue = Number(this.list[back].getAttribute("value"));
      if (fvalue >= bvalue) {
        newList.push(bvalue);
        ++back;
      } else {
        newList.push(fvalue);
        ++front;
      }
    }
    while (front <= mid) {
      newList.push(Number(this.list[front].getAttribute("value")));
      ++front;
    }
    while (back <= end) {
      newList.push(Number(this.list[back].getAttribute("value")));
      ++back;
    }

    for (let c = start; c <= end; ++c) {
      this.list[c].setAttribute("class", "cell current");
    }
    for (let c = start, p = 0; c <= end && p < newList.length; ++c, ++p) {
      await this.help.pause();
      this.list[c].setAttribute("value", newList[p]);
      this.list[c].style.height = `${3.5 * newList[p]}px`;
      if (this.boxes.length) {
        this.boxes[c].innerText = newList[p];
      }
    }
    for (let c = start; c <= end; ++c) {
      this.list[c].setAttribute("class", "cell");
    }
  };

  // ------------------- QUICK SORT -------------------
  QuickSort = async () => {
    await this.QuickDivider(0, this.size - 1);
    for (let c = 0; c < this.size; ++c) {
      this.list[c].setAttribute("class", "cell done");
      await this.doneBox(c);
    }
  };

  QuickDivider = async (start, end) => {
    if (start < end) {
      let pivot = await this.Partition(start, end);
      await this.QuickDivider(start, pivot - 1);
      await this.QuickDivider(pivot + 1, end);
    }
  };

  Partition = async (start, end) => {
    let pivot = this.list[end].getAttribute("value");
    let prev_index = start - 1;

    await this.help.markSpl(end);
    await this.markBox(end, "min");

    for (let c = start; c < end; ++c) {
      let currValue = Number(this.list[c].getAttribute("value"));
      await this.help.mark(c);
      await this.markBox(c);

      if (currValue < pivot) {
        prev_index += 1;
        await this.help.mark(prev_index);
        await this.markBox(prev_index);

        await this.help.swap(c, prev_index);

        let tmp = this.boxes[c].innerText;
        this.boxes[c].innerText = this.boxes[prev_index].innerText;
        this.boxes[prev_index].innerText = tmp;

        await this.help.unmark(prev_index);
        await this.unmarkBox(prev_index);
      }
      await this.help.unmark(c);
      await this.unmarkBox(c);
    }
    await this.help.swap(prev_index + 1, end);

    let tmp = this.boxes[prev_index + 1].innerText;
    this.boxes[prev_index + 1].innerText = this.boxes[end].innerText;
    this.boxes[end].innerText = tmp;

    await this.help.unmark(end);
    await this.unmarkBox(end, "min");
    return prev_index + 1;
  };
}
