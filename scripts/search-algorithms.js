"use strict";

class searchAlgorithms {
    constructor(time) {
        this.list = document.querySelectorAll(".cell");
        this.size = this.list.length;
        this.time = time;
        this.help = new Helper(this.time, this.list);
    }

    // Sleep function to control animation
    sleep = async () => {
        return new Promise(res => setTimeout(res, this.time * 100));
    }

    // LINEAR SEARCH
    LinearSearch = async (target) => {
        for (let i = 0; i < this.size; i++) {
            await this.help.mark(i);
            await this.sleep();
            let value = Number(this.list[i].getAttribute("value"));
            if (value === target) {
                this.list[i].setAttribute("class", "cell done");
                return i;
            }
            await this.help.unmark(i);
        }
        alert("Element not found!");
        return -1;
    };

    // BINARY SEARCH (requires sorted array)
    BinarySearch = async (target) => {
        let left = 0, right = this.size - 1;

        while (left <= right) {
            let mid = Math.floor((left + right) / 2);
            await this.help.mark(mid);
            await this.sleep();

            let value = Number(this.list[mid].getAttribute("value"));
            if (value === target) {
                this.list[mid].setAttribute("class", "cell done");
                return mid;
            }

            await this.help.unmark(mid);

            if (value < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        alert("Element not found!");
        return -1;
    };
}
