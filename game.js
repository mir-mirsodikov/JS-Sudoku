"use strict";
/*
  * Main js file for the game
  * All the game logistics are stored here
*/

let table = "<table>"; //initialize a table tag
let q = 1; // a counter for quadrants
let puzzle; //2D puzzle array
var puzzleString; //puzzle in string format
var difficulty; //difficulty variable
var solution; //2D array with solution to puzzle
var seconds = 0; //seconds counter
var minutes = 0; //minutes counter
var time = "";   //time display string

var difficultyButtons = document.getElementById("difficulty").getElementsByTagName("td"); //get all the difficulty buttons in one
let cellStyle = document.getElementById("highlight"); // create a variable that holds the style tag

//Assign the getDifficulty function to all the difficulty buttons
for (let i = 0; i < difficultyButtons.length; i++) {
  difficultyButtons[i].onclick = getDifficulty;
}

emptyDisplay();

//-------------------------------------------------------------------------------

function init() {
    // puzzle = sudoku.board_string_to_grid(sudoku.generate("easy"));
    // c = row and r = column. I don't know how that happened
    table = "<table>";
    for (let c = 0; c < puzzle.length; c++) // a for loop for a 2D array - this is the rows
    {
        table += "<tr id='row-" + (c + 1) + "'>"; //set up the rows
        for (let r = 0; r < puzzle[0].length; r++) // this is the column
        {
            //sort out the quadrants
            if (c < 3 && r < 3) q = 1;
            else if (c < 3 && r < 6) q = 2;
            else if (c < 3 && r < 9) q = 3;
            else if (c < 6 && r < 3) q = 4;
            else if (c < 6 && r < 6) q = 5;
            else if (c < 6 && r < 9) q = 6;
            else if (c < 9 && r < 3) q = 7;
            else if (c < 9 && r < 6) q = 8;
            else if (c < 9 && r < 9) q = 9;

            // add a table cell and give it an id with the row, column, quadrant, and number stored inside
            table += "<td id='row-" + (c + 1) + "col-" + (r + 1) + "quad-" + q + "num-" + puzzle[c][r] + "'>";
            if (puzzle[c][r] != ".") // 0 = empty cell
                table += puzzle[c][r] // this is going through a 2D array in another file and adding the numbers in if they are not 0
            else // if the cell is empty then add an input box
                table += "<input maxlength='1' id='row-" + (c + 1) + "col-" + (r + 1) + "quad-" + q + "'>";
            //class='empty'
            table += "</td>"
        }
        table += "</tr>"
    }

    table += "</table>";

    //add the table to the html file
    document.getElementById("board").innerHTML = table;


    //create a table for the numbers on the bottom of the page
    let numButtons = "<table><tr>";

    //populate the table with the numbers
    for (let i = 1; i < 10; i++) {

        numButtons += "<td id='num-" + i + "'>" + i + "</td>";
    }

    //close off the table
    numButtons += "</tr></table>";

    //add the table to the HTML file
    document.getElementById("buttons").innerHTML = numButtons;

    // ----------------------------------------------------------------------------------------------

    // gather up all of the table cells
    var cell = document.getElementById("board").getElementsByTagName("td"); // gather cells from the game
    var buttons = document.getElementById("buttons").getElementsByTagName("td"); // gather cells from the table at the bottom of page
    var emptyCells = document.getElementsByTagName("input");

    //highlight the cell, row, column, and qudrant when clicked
    for (let i = 0; i < cell.length; i++) {
        cell[i].onclick = highlight;
    }

    //highlight all the same numbers when table at the bottom of page is used
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].onclick = showNums;
    }

    //when a number has been input add it to the puzzle
    for (let i = 0; i < emptyCells.length; i++) {
        //emptyCells[i].onkeyup = changeInputID;
        emptyCells[i].onkeyup = addNumToPuzzle;
        emptyCells[i].onclick = highlight;
    }

    setInterval(stopwatch, 1000); //start the stopwatch
}

//-------------------------------------------------------------------------------

//Stopwatch function to keep track of elapsed time
function stopwatch() {
  seconds++;
  if (seconds == 60) {
    minutes++;
    seconds = 0;
  }
  if (seconds < 10) time = minutes + ":0" + seconds;
  else time = minutes + ":" + seconds;
  document.getElementById("timer").innerHTML = "<h1>" + time + "</h1>";
}

//-------------------------------------------------------------------------------

//Configure the difficulty buttons
function getDifficulty(e) {
  //turn off the click procedure after one of the buttons have been clicked
  for (let i = 0; i < difficultyButtons.length; i++) {
    difficultyButtons[i].onclick = null;
  }
  difficulty = e.target.id;
  document.getElementById(difficulty).id = difficulty + "-selected"; //add a special tag to keep it highlighted
  puzzleString = sudoku.generate(difficulty); //generate the puzzle with selected difficulty
  puzzle = sudoku.board_string_to_grid(puzzleString); //turn the puzzle into a 2D array
  solution = sudoku.board_string_to_grid(sudoku.solve(puzzleString)); //generate a solution for the selected puzzle
  init(); //call the main function
}

//Display an empty table that will be filled after difficulty is selected
function emptyDisplay() {
  for (let c = 0; c < 9; c++)
  {
      table += "<tr>"; //set up the rows
      for (let r = 0; r < 9; r++) // this is the column
      {
          table += "<td>";
          table += "</td>"
      }
      table += "</tr>"
  }
  table += "</table>";

  //add the table to the html file
  document.getElementById("board").innerHTML = table;
}

//-------------------------------------------------------------------------------

function highlight(e) { //highlight the entire 3x3 block and the row and col

    // row-xcol-yquad-znum-c
    // gather the id assigned to each table cell and then organize them in appropriate variables
    let cellID = e.target.id;
    let cellRow = cellID.substring(0, 5);
    let cellCol = cellID.substring(5, 10);
    let quadrant = cellID.substring(10, 16);
    let cellNum = cellID.substring(16)
    let s = ""; //style variable


    // highlight colors
    s += "td[id*='" + cellRow + "'], input[id*='" + cellRow + "'] {background-color: #E2E7ED;}"; //highlight the row
    s += "td[id*='" + cellCol + "'], input[id*='" + cellCol + "'] {background-color: #E2E7ED;}"  //highlight the column
    s += "td[id*='" + quadrant + "'], input[id*='" + quadrant + "'] {background-color: #E2E7ED;}"; //highlight the quadrant
    s += "td#" + cellID + ", input#" + cellID + "{background-color: #BBDEFB;}"; //highluight the cell
    s += "td[id*='" + cellNum + "'], input[id*='" + cellNum + "'] {background-color: #CBDBED;}"; //highlight all cells with same num
    cellStyle.innerHTML = s;
    //console.log(cellRow + " " + cellCol + " " + quadrant + " " + cellNum);
}

//-------------------------------------------------------------------------------

//Highlight all the numbers selected by the table on the bottom
function showNums(e) {
    let cellID = e.target.id;
    let x = "";
    x += "td[id*='" + cellID + "'], input[id*='" + cellID + "'] {background-color: #CBDBED;}"; //highlight all the same numbers
    cellStyle.innerHTML = x;
}

//-------------------------------------------------------------------------------

/*
function changeInputID(e) {
    let cellID = e.target.id;
    let selectedCell = document.getElementById(cellID);
    let num = document.getElementById(cellID).value;
    selectedCell.id = cellID + "num-" + num;
    console.log(selectedCell.id);
}
*/

//-------------------------------------------------------------------------------

function addNumToPuzzle(e) {
    let cellID = e.target.id; //get the cell id
    let cellRow = parseInt(cellID.substring(4, 5), 10) - 1; //get the cell row
    let cellCol = parseInt(cellID.substring(9, 10), 10) - 1; // get the cell column
    let selectedCell = document.getElementById(cellID); //get the specific cell selected
    let num; //the number being input
    //if the selected cell is empty then go ahead and input
    if (puzzle[cellRow][cellCol] == ".") {
      num = selectedCell.value; //get the number from the cell
      selectedCell.id = cellID + "num-" + num; //add the number to the id
    }
    //if there is already a number there then change the number and id
    else {
      num = String.fromCharCode(e.keyCode); //get number from the keyCode
      selectedCell.value = num; //change the value of the cell
      selectedCell.id = cellID.substring(0, cellID.length - 1) + num; //change the number in the id
    }
    puzzle[cellRow][cellCol] = num; // add the number to the array
    highlight(e); //highlight the board

    //checkPuzzle(cellRow, cellCol, selectedCell);
    //console.log(selectedCell.id);
    //console.log(cellRow + " " + cellCol);
    //console.log(puzzle);
}

/*
function checkPuzzle(row, col, cell) {
    if (puzzle[row][col] == solution3[row][col])
    {
        //console.log(true);
        cell.classList.add("correct");
    }
    else
    {
        //console.log(false);
        cell.classList.add("wrong");
        console.log(cell.class);
    }
}
*/
