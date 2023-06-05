"use strict";

document.addEventListener("DOMContentLoaded", function() {
    setDefaultSizeColor();
    setColorButton();
    addGrid();
    document.querySelector('#btn-reset').addEventListener('click', () => { refreshPage() });
    document.querySelector('#btn-squares').addEventListener('click', () => { setSquares() });
    setSelectButtonEventListener();
});


function setDefaultSizeColor () {
    // Set default values for new user
    if (!localStorage.getItem("totalSquares")) {
        localStorage.setItem("totalSquares", 8);
    };
    if (!localStorage.getItem("color")) {
        localStorage.setItem("color", "black");
    }
}


function setColorButton() {
    const color = localStorage.getItem("color"); 
    if (color === "rainbow") {
        colorModeSelect.classList.add("rainbow");
    } else {
        colorModeSelect.classList.remove("rainbow");
    }
}   


function addGrid() {
    const rows = localStorage.getItem("totalSquares");
    const columns = rows; // For now the grid is always set to be a square 
    const color = localStorage.getItem("color");

    var gridBox = document.querySelector('.grid-box');

    for (var i = 0; i < rows; i++) {
        var gridRow = document.createElement('div');
        gridRow.className = 'grid-row';

        for (var j = 0; j < columns; j++) {
            var cell = document.createElement('div');
            cell.style.background = 'hsl(0, 0%, 100%)'; // Set all cells initially to white.
            cell.className = 'cell';
            cell.addEventListener('mouseover', event => {
                
                if (color === 'black') {
                    event.target.style.backgroundColor = "black";
                } else if (color === 'rainbow') {
                    event.target.style.backgroundColor = generateRandomColor();
                } else if (color === 'grayscale') {
                    const color = event.target.style.backgroundColor;
                    const rgbArr = rgbsToValues(color);
                    event.target.style.backgroundColor = `rgb( ${rgbArr[0]}, ${rgbArr[1]}, ${rgbArr[2]} )`
                }
            });
            gridRow.appendChild(cell);
        }
        gridBox.appendChild(gridRow);
    }
}


function removeGrid() {
    var gridBox = document.querySelector('.grid-box');
  
    while (gridBox.firstChild) {
      gridBox.removeChild(gridBox.firstChild);
    }
}

function refreshPage() {
    removeGrid();
    addGrid();
}


function setSquares() {
    const answer = parseInt(prompt("Sketch with how many squares?",0));
    localStorage.setItem("totalSquares", answer);
    refreshPage();
}


function generateRandomColor() {
    // Generate random values for red, green, and blue components
    var red = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);
  
    // Create the RGB color string
    var color = "rgb(" + red + ", " + green + ", " + blue + ")";
    return color;
}

function setSelectButtonEventListener() {
    document.getElementById("colorModeSelect").addEventListener("change", event => {
        localStorage.setItem("color", event.target.value);
        setColorButton();
        removeGrid();
        addGrid();
    });    
}

function rgbsToValues(rgbString) {

    // Remove the "rgb(" and ")" from the string
    var rgbValues = rgbString.substring(4, rgbString.length - 1);

    // Split the string into an array of individual values
    var rgbArray = rgbValues.split(",");

    // Extract the values of r, g, and b
    var r = parseInt(rgbArray[0].trim(), 10);
    var g = parseInt(rgbArray[1].trim(), 10);
    var b = parseInt(rgbArray[2].trim(), 10);

    // Darken the color by 10%
    r = r - 25.5;
    g = g - 25.5;
    b = b - 25.5;

    return [r, g, b];
}