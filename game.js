"use strict";

let table = "<table>"; //initialize a table tag
let q = 1; // a counter for quadrants


// c = row and r = column. I don't know how that happened
for (let c = 0; c < puzzle1.length; c++) // a for loop for a 2D array - this is the rows
{
    table += "<tr id='row-" + (c+ 1) + "'>"; //set up the rows
    for (let r = 0; r < puzzle1[0].length; r++) // this is the column
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
        table += "<td id='row-" + (c + 1) + "col-" + (r + 1) + "quad-" + q + "num-" + puzzle1[c][r] + "'>";
        if (puzzle1[c][r] != 0) // 0 = empty cell
            table += puzzle1[c][r] // this is going through a 2D array in another file and adding the numbers in if they are not 0
        else // if the cell is empty then add an input box
            table += "<input class='empty' maxlength='1' id='row-" + (c + 1) + "col-" + (r + 1) + "quad-" + q + "'>"; 

        table += "</td>"
    }
    table += "</tr>"
}

table += "</table>";

//add the table to the html file
document.getElementById("board").innerHTML = table;

let numButtons = "<table><tr>";

for (let i = 1; i < 10; i++)
{
    
    numButtons += "<td id='num-" + i + "'>" + i + "</td>";
}

numButtons += "</tr></table>";

document.getElementById("buttons").innerHTML = numButtons;

/*
window.onload = init;

function init(e) {

}
*/

// gather up all of the table cells
var cell = document.getElementById("board").getElementsByTagName("td");
var buttons = document.getElementById("buttons").getElementsByTagName("td");
//assign the events and the procedures
for (let i = 0; i < cell.length; i++) 
{
    cell[i].onclick = highlight;
}

for (let i = 0; i < buttons.length; i++)
{
    buttons[i].onclick = showNums;
}
         

// create a variable that holds the style tag
let cellStyle = document.getElementById("highlight");

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
    s += "td[id*='" + cellRow + "'], input[id*='" + cellRow + "'] {background-color: #E2E7ED;}";
    s += "td[id*='" + cellCol + "'], input[id*='" + cellCol + "'] {background-color: #E2E7ED;}"
    s += "td[id*='" + quadrant + "'], input[id*='" + quadrant + "'] {background-color: #E2E7ED;}";
    s += "td#" + cellID + ", input#" +  cellID + "{background-color: #BBDEFB;}";
    s += "td[id*='" + cellNum + "'] {background-color: #CBDBED;}";
    cellStyle.innerHTML = s;
    console.log(cellRow + " " + cellCol + " " + quadrant + " " + cellNum);
}

function showNums(e)
{
    let cellID = e.target.id;
    

    let x = "";
    x += "td[id*='" + cellID + "'] {background-color: #CBDBED;}";
    cellStyle.innerHTML = x;
    console.log(cellID);
}

/*
function hover(e) // highlight the cell that the mouse is hovering over
{
    let cellID = e.target.id;
    let x = "";
    x += "td#" + cellID + ", input#" +  cellID + "{background-color: #BBDEFB;}";
    cellStyle.innerHTML = x;
}
*/