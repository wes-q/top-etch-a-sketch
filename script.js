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
        localStorage.setItem("color", "grayscale");
    }
}


function setColorButton() {
    const color = localStorage.getItem("color"); 
    if (color === "rainbow") {
        colorModeSelect.classList.add("rainbow");
    } else if (color === "grayscale") {
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
        cell.className = 'cell';
        cell.addEventListener('mouseover', event => {
            
            if (color === 'grayscale') {
                event.target.style.backgroundColor = "gray";
            } else if (color === 'rainbow') {
                event.target.style.backgroundColor = generateRandomColor();
            } else {
                alert("color did not match any");
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
