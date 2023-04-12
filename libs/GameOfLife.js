

const GameOfLife = (function() {
  "use strict";

  // class
  function GameOfLife(opts = {}) {
    this.width = opts.width;
    this.height = opts.height;
    this.grid = new Uint8Array(this.width*this.height);
    this.newGrid = new Uint8Array(this.width*this.height);
  }
  
  // private
  function isImage(elem) { return elem instanceof HTMLImageElement; }
  function isCanvas(elem) { return elem instanceof HTMLCanvasElement; }

  function swapGrid() {
    var grid = this.grid;
    this.grid = this.newGrid;
    this.newGrid = grid;
  }

  function countNeighbours(x, y) {
    var sum = 0;
    for (var i = -1; i < 2; i++) {
      for (var j = -1; j < 2; j++) {
        if (i != 0 || j != 0) {
          var nx = x + i;
          var ny = y + j;
          if (nx >= this.width)  nx = 0;
          else if (nx < 0) nx = this.width - 1;
          if (ny >= this.height) ny = 0;
          else if (ny < 0) ny = this.height - 1;
          if (this.grid[ny*this.width + nx]) sum++;
        }
      }
    }
    return sum;
  }


  // public
  GameOfLife.prototype.randomize = function() {
    var size = this.width * this.height;
    for (var i = 0; i < size; i++) {
      this.grid[i] = (Math.random() > 0.5)? 1 : 0;
    }
    return this;
  };


  GameOfLife.prototype.animate = function() {

    for (var y = 0; y < this.height; y++) {
      for (var x = 0; x < this.width; x++) {
        var offset = y * this.width + x;
        var alive = this.grid[offset];
        var count = countNeighbours.call(this, x,y);
        if (alive) {
          if (count == 2 || count == 3) this.newGrid[offset] = 1;
          else this.newGrid[offset] = 0;
        } else {
          if (count == 3) this.newGrid[offset] = 1;
          else this.newGrid[offset] = 0;
        }
      }
    }

    //if (log) console.log(real)
    //grid = newGrid;
    swapGrid.call(this);
    return this;
  };


  GameOfLife.prototype.drawOnCanvas = function(canvas) {
    if (!canvas) return this;
    var context = canvas.getContext("2d");
    var width = Math.min(canvas.width, this.width);
    var height = Math.min(canvas.height, this.height);
    var res = 1;
    context.clearRect(0,0, width,height);

    for (var y = 0; y < height; y++) {
      var yres = y*res;
      for (var x = 0; x < width; x++) {
        var offset = y * this.width + x;
        var cell = this.grid[offset];
        if (cell) context.fillRect(x*res,yres, res,res);
        //if (grid[i][j]) {
        //  context.fillRect(i * res, j * res, res, res);
        //  sum += rows / res;
        //  if (val == 0) val = (rows - j) / rows;
        //}
      }
    }
    return this;
  };

  GameOfLife.prototype.draw = function(elem) {
    if (isCanvas(elem)) return this.drawOnCanvas(elem);
    return this;
  };

  return GameOfLife;
})();


