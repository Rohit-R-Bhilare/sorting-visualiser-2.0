"use strict";

// ------------------- START FUNCTION -------------------
const start = async () => {
  let algoValue = Number(document.querySelector(".algo-menu").value);
  let speedValue = Number(document.querySelector(".speed-menu").value);
  let targetValue = Number(document.querySelector("#targetInput").value);

  if (speedValue === 0) speedValue = 1;
  if (algoValue === 0) {
    alert("No Algorithm Selected");
    return;
  }

  let algorithm = new sortAlgorithms(speedValue);
  let searchAlgo = new searchAlgorithms(speedValue);
  let recursion = new recursionVisualizer(speedValue);

  // -------- Sorting --------
  if (algoValue === 1) await algorithm.BubbleSort();
  if (algoValue === 2) await algorithm.SelectionSort();
  if (algoValue === 3) await algorithm.InsertionSort();
  if (algoValue === 4) await algorithm.MergeSort();
  if (algoValue === 5) await algorithm.QuickSort();

  // -------- Searching --------
  if (algoValue === 6) {
    if (!targetValue && targetValue !== 0) {
      alert("Please enter a target value to search.");
      return;
    }
    await searchAlgo.LinearSearch(targetValue);
  }
  if (algoValue === 7) {
    if (!targetValue && targetValue !== 0) {
      alert("Please enter a target value to search.");
      return;
    }
    await algorithm.QuickSort(); // sort first
    await searchAlgo.BinarySearch(targetValue);
  }

  // -------- Recursion --------
  if (algoValue === 8) {
    await clearScreen();
    let sizeValue = Number(document.querySelector(".size-menu").value);
    if (sizeValue === 0) {
      alert("Please choose recursion depth (array size dropdown).");
      return;
    }
    await recursion.factorial(sizeValue); // recursion from N → 1
  }
};

// ------------------- RENDER FUNCTIONS -------------------
const RenderScreen = async () => {
  await RenderList();
};

const RenderList = async () => {
  let sizeValue = Number(document.querySelector(".size-menu").value);
  await clearScreen();

  let list = await randomList(sizeValue);
  const arrayNode = document.querySelector(".array");

  // Render as bars (default)
  for (const element of list) {
    const node = document.createElement("div");
    node.className = "cell";
    node.setAttribute("value", String(element));
    node.style.height = `${3.8 * element}px`;
    arrayNode.appendChild(node);
  }

  // Also render as boxes for searching
  const divnode = document.createElement("div");
  divnode.className = "s-array";
  list.forEach((element) => {
    const dnode = document.createElement("div");
    dnode.className = "s-cell";
    dnode.innerText = element;
    dnode.setAttribute("value", element);
    divnode.appendChild(dnode);
  });
  arrayNode.appendChild(divnode);
};

// ------------------- UTILITIES -------------------
const randomList = async (Length) => {
  let list = new Array();
  let lowerBound = 1;
  let upperBound = 100;

  for (let counter = 0; counter < Length; ++counter) {
    let randomNumber = Math.floor(
      Math.random() * (upperBound - lowerBound + 1) + lowerBound
    );
    list.push(parseInt(randomNumber));
  }
  return list;
};

const clearScreen = async () => {
  document.querySelector(".array").innerHTML = "";
};

const response = () => {
  let Navbar = document.querySelector(".navbar");
  if (Navbar.className === "navbar") {
    Navbar.className += " responsive";
  } else {
    Navbar.className = "navbar";
  }
};

// ------------------- EVENT LISTENERS -------------------
document.querySelector(".icon").addEventListener("click", response);
document.querySelector(".start").addEventListener("click", start);
document.querySelector(".size-menu").addEventListener("change", RenderScreen);

// Toggle target input visibility based on algorithm type
document.querySelector(".algo-menu").addEventListener("change", () => {
  let algoValue = Number(document.querySelector(".algo-menu").value);
  let targetInput = document.querySelector("#targetInput");
  if (algoValue === 6 || algoValue === 7) {
    targetInput.style.display = "inline-block";
  } else {
    targetInput.style.display = "none";
    targetInput.value = "";
  }
  RenderScreen();
});

window.onload = RenderScreen;
