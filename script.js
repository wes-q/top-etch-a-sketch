"use strict";

document.addEventListener("DOMContentLoaded", function() {
    addGrid();
});

function x() {
    alert('x');
}

function addGrid() {
    var gridBox = document.querySelector('.grid-box');

    const rows = 16;
    const columns = 16;

    for (var i = 0; i < rows; i++) {
    var gridRow = document.createElement('div');
    gridRow.className = 'grid-row';

    for (var j = 0; j < columns; j++) {
        var cell = document.createElement('div');
        cell.className = 'cell';
        cell.addEventListener('mouseover', event => {
            event.target.style.backgroundColor = "gray";
        });
    gridRow.appendChild(cell);
  }
  gridBox.appendChild(gridRow);
}
}

