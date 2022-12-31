"use strict";
import { finalSorted } from "./wordsScored.js";


// Fill in the suggestions box
document.getElementById("suggestions").textContent = finalSorted.join(" ");

//Focusing on the first square
let currentEl = 1;

const insertGrid = function () {
  for (let i = 30; i > 0; i--) {
    //create a row
    if (i % 5 === 0) {
      const htmlGroup = `<div id="middle"  class="input-group input-group-lg w-25 justify-content-center mx-auto"></div>`;

      document
        .getElementById("insert")
        .insertAdjacentHTML("afterbegin", htmlGroup);
    }

    const htmlCell = `<input
    type="text"
    style="text-align: center; background-color: white"
    
    class="box form-control border rounded border-dark"
    
    id="${i}"
    maxlength="1"
  />`;
    document
      .getElementById("middle")
      .insertAdjacentHTML("afterbegin", htmlCell);
  }
};

insertGrid();

//Change color function - using event delegation.
let state;

const changeColor = function () {
  const element = document.getElementById("insert");
  state = 0;
  let lastBox;

  element.addEventListener("click", function (e) {
    if (e.target.classList.contains("box")) {
      if (e.target.id !== lastBox) {
        state = 0;
      }
      if (state === 0) {
        e.target.style.backgroundColor = "yellow";
        state++;
      } else if (state === 1) {
        e.target.style.backgroundColor = "green";
        state++;
      } else if (state === 2) {
        e.target.style.backgroundColor = "white";
        state = 0;
      }
      lastBox = e.target.id;
    }
  });
};
changeColor();

//!1. button click

const btn = document.querySelector(".btn-primary");

//this function should return 3 elements - that should be set as input in the html textareas

const run = function () {
  const yellowSquaresFinal = [];
  const greenSquaresFinal = [];
  const whiteSquares = [];
  let yellowString;
  let greenString;
  let darkString;
  let i;

  const readGrid = function () {
    const yellowSquares = [];
    const greenSquares = [];
    const yellowSquaresTemp = [];
    const greenSquaresTemp = [];

    for (i = 1; i < 31; i++) {
      const letter = document.getElementById(i).value.toLowerCase();
      const box = document.getElementById(i);

      //depending on the colour of the aquare, add the letter it holds to appropriate array
      if (box.style.backgroundColor === "white") {
        whiteSquares.push(letter);
      }

      if (box.style.backgroundColor === "yellow") {
        
        yellowSquares.push(letter);

        yellowSquaresTemp.push(yellowSquares.map((el) => (el = `${i} ${el}`)));

        let holder;
        //5 10 15 20 25 30
        let tempForI;
        if (i % 5 === 0) {
          tempForI = 5;
        } else {
          tempForI = i % 5;
        }

        holder = yellowSquares.map((el) => (el = `${tempForI} ${letter}`));
        let counter = 0;

        yellowSquaresFinal.push(holder[counter % 5]);
        yellowString = yellowSquaresFinal.join(` `).trim();
        //final result
        console.log(yellowString);
        counter++;
      }

      if (box.style.backgroundColor === "green") {
        greenSquares.push(letter);
        greenSquaresTemp.push(greenSquares.map((el) => (el = `${i} ${el}`)));

        let holder;
        let tempForI;
        if (i % 5 === 0) {
          tempForI = 5;
        } else {
          tempForI = i % 5;
        }
        holder = greenSquares.map((el) => (el = `${tempForI} ${letter}`));
        let counter = 0;

        greenSquaresFinal.push(holder[counter % 5]);
        console.log(greenSquaresFinal);
        greenString = greenSquaresFinal.join(` `).trim();
        //final result
        console.log(greenString);
        counter++;
      }
    }

    console.log(whiteSquares.join(" ").trim());

    //waringn redeclaring a variable
    darkString = whiteSquares.join(" ").trim();
  };

  whiteSquares.length = 0;
  yellowSquaresFinal.length = 0;
  greenSquaresFinal.length = 0;

  readGrid();

  let options = [1, 2, 3, 4, 5];

  if (yellowString === undefined) {
    yellowString = ``;
  }

  let includeLettersArray = yellowString.split(" ");

  let excludeLettersArray = darkString.split(" ");

  //! Excluding dark letters
  // test if a word includes the letter that should be excluded
  function testLetter(word) {
    for (let i = 0; i < excludeLettersArray.length; i++) {
      if (word.includes(excludeLettersArray[i])) {
        return true;
      }
    }
  }

  const itemsDelete = finalSorted.filter(testLetter);

  // if the array of items to delete contains a word from finalSorted return FALSE [test is failed];

  function subtract(word) {
    if (itemsDelete.includes(word)) {
      return false;
    } else {
      return true;
    }
  }

  //create an array that will receive the values that pass the 3 tests
  let wordsLeft = [];

  if (excludeLettersArray[0] === "") {
    wordsLeft = finalSorted;
  } else {
    wordsLeft = finalSorted.filter(subtract);
  }

  //! Including yellow letters

  //create arrays for where the letters should NOT be found (yellow wordle letters)
  let yellowIndexArray = [];
  let yellowLettersArray = [];

  for (let i = 0; i < includeLettersArray.length; i++) {
    if (options.includes(Number(includeLettersArray[i]))) {
      yellowIndexArray.push(Number(includeLettersArray[i]));
    } else if (isNaN(parseInt(includeLettersArray[i])) === true) {
      yellowLettersArray.push(includeLettersArray[i]);
    }
  }

  function include(word) {
    let temp = 0;

    for (let i = 0; i < yellowIndexArray.length; i++) {
      if (
        word.includes(yellowLettersArray[i]) &&
        word.charAt(yellowIndexArray[i] - 1) !== yellowLettersArray[i]
      ) {
        temp += 1;
        //temp was introduced so that all the necessary letters will be checked for
        if (temp === yellowIndexArray.length) {
          return true;
        }
      }
    }
  }

  const itemsInclude = finalSorted.filter(include);

  function leftInclude(word) {
    if (itemsInclude.includes(word)) {
      return true;
    }
  }

  let wordsLeftIncluding = [];

  if (includeLettersArray[0] === "") {
    wordsLeftIncluding = wordsLeft;
  } else {
    wordsLeft = wordsLeft.filter(leftInclude);
  }

  //! 3 Include green letters at specific indices

  if (greenString === undefined) {
    greenString = ``;
  }
  const greenLettersArray = greenString.split(" ");

  //create and array with the indices of green letters (from 1 to 5)
  let indexArray = [];
  let lettersArray = [];

  //creating the index array and the letters array for storing which letters should be found at which positions
  for (let i = 0; i < greenLettersArray.length; i++) {
    if (options.includes(Number(greenLettersArray[i]))) {
      indexArray.push(Number(greenLettersArray[i]));
    } else if (isNaN(parseInt(greenLettersArray[i])) === true) {
      lettersArray.push(greenLettersArray[i]);
    }
  }

  let wordsFilteredGreen = [];

  function specificIndicesLetters(word) {
    let temp = 0;
    for (let i = 0; i < indexArray.length; i++) {
      if (word.charAt(indexArray[i] - 1) === lettersArray[i]) {
        temp += 1;
        if (temp === indexArray.length) {
          return true;
        }
      }
    }
  }

  if (greenLettersArray[0] === "") {
    wordsFilteredGreen = wordsLeft;
  } else {
    wordsLeft = wordsLeft.filter(specificIndicesLetters);
  }


  let wordsLeftPrint = wordsLeft.join(" ");
  
  //error message
  
  if (
    includeLettersArray.some((item) => excludeLettersArray.includes(item)) ||
    greenLettersArray.some((item) => excludeLettersArray.includes(item))
  ) {
    //making sure that when there is no input in both fields then the error message will not be prduced
    if (includeLettersArray[0] !== "" || greenLettersArray[0] !== "") {
      document.getElementById("suggestions").textContent =
        'Error: trying to exclude and include the same letter; check your input - you probably wrote the same letter in the "include" and "exclude" box.';
    }
  } else {
    document.getElementById("suggestions").textContent = wordsLeftPrint;
  }
};

btn.addEventListener("click", function () {
  run();
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    run();
  }
});

const focuser = function () {
  document.getElementById(`${currentEl}`).focus();
};
focuser();

function isLetter(c) {
  return c.length === 1 && c.toLowerCase() != c.toUpperCase();
}

//focus after every key press
document.addEventListener("keydown", function (e) {
  if (isLetter(e.key)) {
    focuser();

    currentEl++;
    let currentBox = currentEl - 1;
    let temp;
    for (let i = 0; i < 5; i++) {
      if (currentBox % 5 === 0) {
        if (i === 0) {
          temp = 5;
        } else if (currentBox === 30) {
          temp = 25;
        } else {
          temp = 5 * i;
        }
      } else {
        temp = (currentBox % 5) + 5 * i;
      }
      if (
        currentEl > 5 &&
        document.getElementById(`${temp}`).style.backgroundColor === "green" &&
        document.getElementById(`${temp}`).value === e.key
      ) {
        document.getElementById(`${currentBox}`).style.backgroundColor =
          "green";
      }
    }

    if (currentEl > 31) currentEl = 31;
  } else if (e.key === "Backspace") {
    if (
      document.getElementById(`${currentEl}`).style.backgroundColor ===
        "green" ||
      document.getElementById(`${currentEl}`).style.backgroundColor === "yellow"
    ) {
      document.getElementById(`${currentEl}`).style.backgroundColor = "white";
      state = 0;
    }
    if (currentEl === 1) currentEl = 1;
    else currentEl--;

    focuser();
  }
});
