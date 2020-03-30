"use strict";
/*
  * Main .js file for the game
  * All the game logistics are stored here
*/

//let gamePuzzle = new Puzzle; // initialize gamePuzzle object of the Puzzle class
let table = "<table>"; //initialize a table tag
let q = 1; // a counter for quadrants
let puzzle = []; //puzzlesAll[Math.floor(Math.random() * puzzlesAll.length)] // retrieve random puzzle from the array
//let puzzle = gamePuzzle.createPuzzle();/*puzzlesAll[Math.floor(Math.random() * puzzlesAll.length)]*/
//let solution = solution3;

window.onload = init;

//-------------------------------------------------------------------------------

function init() {
    // c = row and r = column. I don't know how that happened
    puzzle = createPuzzle();
    for (let c = 0; c < puzzle.length; c++) // a for loop for a 2D array - this is the rows
    {
        table += "<tr id='row-" + (c + 1) + "'>"; //set up the rows
        for (let r = 0; r < puzzle[0].length; r++) // this is the column
        {
            /* Quadrant
                1 2 3  |
                4 5 6  |
                7 8 9  |
              ----------
            */


            //trying to sort out the quadrants
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
            if (puzzle[c][r] != 0) // 0 = empty cell
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

    //dispNums(puzzle);
}

//-------------------------------------------------------------------------------

// create a variable that holds the style tag
let cellStyle = document.getElementById("highlight");

//-------------------------------------------------------------------------------

function highlight(e) { //highlight the entire 3x3 block and the row and col
    /*
         1 2 3
       1 * * *
       2 * * *
       3 * * *

    */

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
    console.log(cellRow + " " + cellCol + " " + quadrant + " " + cellNum);
}

//-------------------------------------------------------------------------------

function showNums(e) {
    let cellID = e.target.id;
    let x = "";
    x += "td[id*='" + cellID + "'], input[id*='" + cellID + "'] {background-color: #CBDBED;}";
    cellStyle.innerHTML = x;
    console.log(cellID);
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
    let cellID = e.target.id;
    let cellRow = parseInt(cellID.substring(4, 5), 10) - 1;
    let cellCol = parseInt(cellID.substring(9, 10), 10) - 1;
    let selectedCell = document.getElementById(cellID);
    let num = document.getElementById(cellID).value;
    puzzle[cellRow][cellCol] = parseInt(document.getElementById(cellID).value, 10);
    selectedCell.id = cellID + "num-" + num;
    highlight(e);
    //checkPuzzle(cellRow, cellCol, selectedCell);
    console.log(selectedCell.id);
    console.log(cellRow + " " + cellCol);
    console.log(puzzle);
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

function dispNums(puzzle)
{
    for (let i = 0; i < puzzle[4].length; i++)
        console.log(puzzle[4][i]);

    for (let i = 0; i < puzzle.length; i++)
        console.log(puzzle[i][0]);
}
*/
