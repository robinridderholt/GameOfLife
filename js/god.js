'use strict';
var Cell, God;

Cell = require('./Cell.js');

God = (function() {
  function God(width, height) {
    this.width = width;
    this.height = height;
  }

  God.prototype._buildDictionary = function(cells) {
    var c, dict, _i, _len;
    dict = [];
    for (_i = 0, _len = cells.length; _i < _len; _i++) {
      c = cells[_i];
      if (dict[c.x] === null || dict[c.x] === void 0) {
        dict[c.x] = [];
      }
      dict[c.x][c.y] = c.alive;
    }
    return dict;
  };

  God.prototype._countAliveNeighbors = function(dictionary, neighbors) {
    var matches, nCell, _i, _len;
    matches = 0;
    for (_i = 0, _len = neighbors.length; _i < _len; _i++) {
      nCell = neighbors[_i];
      if (dictionary[nCell.x][nCell.y] === true) {
        matches += 1;
      }
    }
    return matches;
  };

  God.prototype._getNeighborsCoordinates = function(x, y) {
    var cells, f;
    cells = [
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
    f = function(c) {
      return (c.x >= 0 && c.y >= 0) && (c.x <= 500 && c.y <= 500);
    };
    return cells.filter(f);
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
    var aliveNeighbors, dict, nearCells;
    dict = this._buildDictionary(allCells);
    nearCells = this._getNeighborsCoordinates(cell.x, cell.y);
    aliveNeighbors = this._countAliveNeighbors(dict, nearCells);
    cell = this._lifeOrDeath(cell, aliveNeighbors);
    return cell;
  };

  God.prototype.decide = function(aliveCells) {
    var aliveCell, aliveDict, allCells, cell, cellsToPlot, x, y, _i, _j, _k, _l, _len, _len1, _ref, _ref1;
    aliveDict = this._buildDictionary(aliveCells);
    allCells = [];
    cellsToPlot = [];
    for (x = _i = 0, _ref = this.width; 0 <= _ref ? _i <= _ref : _i >= _ref; x = 0 <= _ref ? ++_i : --_i) {
      if (x % 10 === 0) {
        for (y = _j = 0, _ref1 = this.height; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; y = 0 <= _ref1 ? ++_j : --_j) {
          if (y % 10 === 0) {
            if (aliveDict[x] === void 0 || aliveDict[x][y] === void 0) {
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
