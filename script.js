"use strict";

document.addEventListener("DOMContentLoaded", function() {
    addGrid(16, 16, 0);
    document.querySelector('#btn-reset').addEventListener('click', () => { refreshPage() });
    document.querySelector('#btn-squares').addEventListener('click', () => { setSquares() });
    setSelectButtonEventListener();
});


function addGrid(rows, columns, color) {
    var gridBox = document.querySelector('.grid-box');

    for (var i = 0; i < rows; i++) {
    var gridRow = document.createElement('div');
    gridRow.className = 'grid-row';

    for (var j = 0; j < columns; j++) {
        var cell = document.createElement('div');
        cell.className = 'cell';
        cell.addEventListener('mouseover', event => {
            
            if (color === 0) {
                event.target.style.backgroundColor = "gray";
            } else if (color === 1) {
                event.target.style.backgroundColor = generateRandomColor();
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
    addGrid(16, 16);
}


function setSquares() {
    const answer = parseInt(prompt("Sketch with how many squares?",0));
    removeGrid();
    addGrid(answer, answer);
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
    
    var colorModeSelect = document.getElementById("colorModeSelect");

    colorModeSelect.addEventListener("change", function() {
      var selectedValue = colorModeSelect.value;
      
      if (selectedValue === "rainbow") {
        colorModeSelect.classList.add("rainbow");
        removeGrid();
        addGrid(16, 16, 1);
      } else {
        colorModeSelect.classList.remove("rainbow");
        removeGrid();
        addGrid(16, 16, 0);
      }
    });    
}
