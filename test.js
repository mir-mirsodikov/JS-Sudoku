class Puzzle
{
    createPuzzle()
    {

        let myPuzzle = [[0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0],]
        let valid = true;
        let initNum;

        /*
        for (let i = 0; i < 81; i++)
        {
            if (valid == true)
            {
                randRow = Math.floor(Math.random() * 9);
                randCol = Math.floor(Math.random() * 9);
                initNum = Math.floor(Math.random() * 9 + 1);
                myPuzzle[randRow][randCol] = initNum;
            }

            console.log(randRow + " " + randCol + " " + initNum);
        }

        let i = 0;
        while (valid)
        {
            randRow = Math.floor(Math.random() * 9);
            randCol = Math.floor(Math.random() * 9);
            initNum = Math.floor(Math.random() * 9 + 1);
            myPuzzle[randRow][randCol] = initNum;

            console.log(randRow + " " + randCol + " " + initNum);
            i++;
            if (i == 80) valid = false;
        }

        for (let i = 0; i < 9; i++)
            for (let j = 0; j < 9; j++)
                myPuzzle[i][j] = 1;
        */

        for (let i = 0; i < myPuzzle.length; i++)
        {
            for (let j = 0; j < myPuzzle[i].length; j++)
            {
                initNum = Math.floor(Math.random() * 9 + 1);
                valid = this.checkPuzzle(i, j, initNum, myPuzzle);
                if (valid)
                {
                    myPuzzle[i][j] = initNum;
                }
                else
                {
                    while(!valid)
                    {
                        initNum = Math.floor(Math.random() * 9 + 1);
                        valid = this.checkPuzzle(i, j, initNum, myPuzzle);
                    }
                    myPuzzle[i][j] = initNum;
                }
            }
        }

        return myPuzzle;
    }

    checkPuzzle(row, col, num, puzzle)
    {
        let check = true;
        //let cell = puzzle[row][col];

        for (let i = 0; i < puzzle[row].length; i++) //go through the row
        {
            if (puzzle[row][i] == num)
                check = false;
        }
        for (let i = 0; i < puzzle.length; i++)
        {
            if (puzzle[i][col] == num)
                check = false;
        }

        console.log(row + " " + col + " " + num);
        return check;
    }

    getQuadrant(c, r)
    {
        let q = 0;

        if (c < 3 && r < 3) q = 1;
        else if (c < 3 && r < 6) q = 2;
        else if (c < 3 && r < 9) q = 3;
        else if (c < 6 && r < 3) q = 4;
        else if (c < 6 && r < 6) q = 5;
        else if (c < 6 && r < 9) q = 6;
        else if (c < 9 && r < 3) q = 7;
        else if (c < 9 && r < 6) q = 8;
        else if (c < 9 && r < 9) q = 9;

        return q;
    }
}

/*
"use strict";

var allNums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var defCol = 0;

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

  //go throgh the rows
  /*
  for (let r = 0; r < myPuzzle.length; r++) {
    //go through the columns
    for (let c = 0; c < myPuzzle[r].length; c++) {
      //generate random number
      initNum = Math.floor(Math.random() * 9 + 1);
      //check to see if random number is valid
      valid = checkNum(r, c, initNum, myPuzzle);

      if (valid) {
        myPuzzle[r][c] = initNum;
      }

      else {
        while(!valid) {
          initNum = Math.floor(Math.random() * 9 + 1);
          valid = checkNum(r, c, initNum, myPuzzle);
        }
        myPuzzle[r][c] = initNum;
      }

    }
  }


  //getRow(myPuzzle, 0);
  //getRow(myPuzzle, 1);
  test(myPuzzle, 0);
  test(myPuzzle, 1);
  test(myPuzzle, 2);
  // test(myPuzzle, 3);
  // test(myPuzzle, 4);
  // test(myPuzzle, 5);
  // test(myPuzzle, 6);
  // test(myPuzzle, 7);
  // test(myPuzzle, 8);
  return myPuzzle;
}

//-----------------------------------------------------------------------------

//Remove the given number from the 'allNums' array
function removeElement(num) {
  let index = allNums.indexOf(num);
  if (index > -1) allNums.splice(index, 1);
}

//-----------------------------------------------------------------------------

//Configure one row at a time
function getRow(puzzle, row) {
  for (let i = 0; i < puzzle[row].length; i++) {
    let num = Math.floor(Math.random() * 9 + 1);
    removeElement(num);
    //console.log("Col: " + i + "   " + allNums);
    if (checkNum(row, i, num, puzzle))
      puzzle[row][i] = num;
    else {
      while (!checkNum(row, i, num, puzzle)) {
        num = Math.floor(Math.random() * 9 + 1);
        removeElement(num);
        //console.log("Col: " + i + "   " + allNums);
      }
      puzzle[row][i] = num;
    }
    allNums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  }
  allNums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
}

//-----------------------------------------------------------------------------

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

  if (check === false && allNums.length === 0 && col > 0) {
    col -= 1;
    allNums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    checkNum(row, col, puzzle);
  }
  else if (check === false) {
    let num = Math.floor(Math.random() * 9 + 1);
    removeElement(num);
    checkNum(row, col, puzzle);
  }
  else if (check) {
    puzzle[row][col] = num;
    //checkNum(row, defCol, puzzle);
  }


  //return check;
}

//-----------------------------------------------------------------------------

//Modified 'getRow' function
function test(puzzle, row) {
  for (let i = 0; i < puzzle[row].length; i++) {
    defCol = i;
    checkNum(row, i, puzzle);
    allNums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  }
  allNums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
}

*/
