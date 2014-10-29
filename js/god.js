'use strict';
var Cell, God;

Cell = require('./Cell.js');

God = (function() {
  function God(width, height) {
    this.width = width;
    this.height = height;
  }

  God.prototype._contains = function(arr, x, y) {
    return arr.some(function(item, index, array) {
      return item.x === x && item.y === y;
    });
  };

  God.prototype._countAliveNeighbors = function(allCells, neighbors) {
    var cell, matches, nCell, _i, _j, _len, _len1;
    matches = 0;
    for (_i = 0, _len = neighbors.length; _i < _len; _i++) {
      nCell = neighbors[_i];
      for (_j = 0, _len1 = allCells.length; _j < _len1; _j++) {
        cell = allCells[_j];
        if (cell.x === nCell.x && cell.y === nCell.y && cell.alive === true) {
          matches += 1;
        }
      }
    }
    return matches;
  };

  God.prototype._getNeighborsCoordinates = function(x, y) {
    return [
      {
        x: x + 10,
        y: y
      }, {
        x: x - 10,
        y: y
      }, {
        x: x,
        y: y + 10
      }, {
        x: x,
        y: y - 10
      }, {
        x: x + 10,
        y: y + 10
      }, {
        x: x + 10,
        y: y - 10
      }, {
        x: x - 10,
        y: y + 10
      }, {
        x: x - 10,
        y: y - 10
      }
    ];
  };

  God.prototype._lifeOrDeath = function(cell, nNeighbors) {
    if (cell.alive === true && nNeighbors < 2) {
      cell.alive = false;
    }
    if (cell.alive === true && (nNeighbors === 2 || nNeighbors === 3)) {
      cell.alive = true;
    }
    if (cell.alive === true && nNeighbors > 3) {
      cell.alive = false;
    }
    if (cell.alive === false && nNeighbors === 3) {
      cell.alive = true;
    }
    return cell;
  };

  God.prototype._whatToDo = function(allCells, cell) {
    var aliveNeighbors, nearCells;
    nearCells = this._getNeighborsCoordinates(cell.x, cell.y);
    aliveNeighbors = this._countAliveNeighbors(allCells, nearCells);
    cell = this._lifeOrDeath(cell, aliveNeighbors);
    return cell;
  };

  God.prototype.decide = function(aliveCells) {
    var aliveCell, allCells, cell, cellsToPlot, x, y, _i, _j, _k, _l, _len, _len1, _ref, _ref1;
    allCells = [];
    cellsToPlot = [];
    for (x = _i = 0, _ref = this.width; 0 <= _ref ? _i <= _ref : _i >= _ref; x = 0 <= _ref ? ++_i : --_i) {
      if (x % 10 === 0) {
        for (y = _j = 0, _ref1 = this.height; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; y = 0 <= _ref1 ? ++_j : --_j) {
          if (y % 10 === 0) {
            if (this._contains(aliveCells, x, y) === false) {
              allCells.push(new Cell(x, y, false));
            }
          }
        }
      }
    }
    for (_k = 0, _len = aliveCells.length; _k < _len; _k++) {
      aliveCell = aliveCells[_k];
      allCells.push(aliveCell);
    }
    for (_l = 0, _len1 = allCells.length; _l < _len1; _l++) {
      cell = allCells[_l];
      cell = this._whatToDo(allCells, cell);
      if (cell.alive) {
        cellsToPlot.push(cell);
      }
    }
    return cellsToPlot;
  };

  return God;

})();

module.exports = God;
