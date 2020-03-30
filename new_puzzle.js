"use strict";

var allNums = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function createPuzzle() {
  //Sudoku puzzle
  let myPuzzle = [[0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0]]

  let valid = true;
  let initNum = 0;

  // test(myPuzzle, 0);
  // test(myPuzzle, 1);
  // test(myPuzzle, 1);
  // test(myPuzzle, 1);
  // test(myPuzzle, 2);
  // test(myPuzzle, 3);
  // test(myPuzzle, 4);
  // test(myPuzzle, 5);
  // test(myPuzzle, 6);
  // test(myPuzzle, 7);
  // test(myPuzzle, 8);
  test2(myPuzzle);

  return myPuzzle;
}

//-----------------------------------------------------------------------------

//Remove the given number from the 'allNums' array
function removeElement(num) {
  let index = allNums.indexOf(num);
  if (index > -1) allNums.splice(index, 1);
}

//-----------------------------------------------------------------------------

function checkEmpty(puzzle) {
  for (let i = 0; i < puzzle.length; i++) {
    for (let j = 0; j < puzzle[i].length; j++) {
      if (puzzle[i][j] == 0) return false;
    }
  }
  return true;
}

function checkNum(row, col, puzzle) {
  let check = true;
  let num = Math.floor(Math.random() * 9 + 1);
  removeElement(num);


  //Check row
  for (let r = 0; r < puzzle[row].length; r++) {
    if (num === puzzle[row][r]) {
      check = false;
    }
  }

  //--------------------------------

  //Check column
  for (let c = 0; c < puzzle.length; c++) {
    if (num === puzzle[c][col]) {
      check = false;
    }
  }

  //--------------------------------

  //Check quadrants
  let startRow = 0; let endRow = 0;
  let startCol = 0; let endCol = 0;

  startRow = Math.floor(row / 3) * 3;
  startCol = Math.floor(col / 3) * 3;

  endRow = startRow + 3;
  endCol = startCol + 3;

  for (let r = startRow; r < endRow; r++) {
    for (let c = startCol; c < endCol; c++) {
      if (num == puzzle[r][c]) check = false;
    }
  }

  //--------------------------------

  console.log("Standard - Row, Col, Num: " + row + ", " + col + ", " + num);
  if (check) {
    puzzle[row][col] = num;
  }
  else if (check === false && allNums.length === 0 && col > 0) { //backtrack
    console.log("     Bakctrack - Row, Col, Num: " + row + ", " + col + ", " + num);
    col -= 1;
    allNums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    puzzle[row][col] = 0;
    checkNum(row, col, puzzle);
  }
  else if (check === false && allNums.length > 0) {
    console.log("B - Row, Col, Num: " + row + ", " + col + ", " + num);
    checkNum(row, col, puzzle);
  }


}

//-----------------------------------------------------------------------------

//Modified 'getRow' function
function test(puzzle, row) {
  for (let i = 0; i < puzzle[row].length; i++) {
    checkNum(row, i, puzzle);
    allNums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  }
  allNums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
}

function test2(puzzle) {
  while (!checkEmpty(puzzle)) {
    for (let i = 0; i < puzzle.length; i++) {
      for (let j = 0; j < puzzle[i].length; j++) {
        if (puzzle[i][j] == 0)
          checkNum(i, j, puzzle);
        allNums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      }
    }
  }
  allNums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
}
