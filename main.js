

// '#0000AA' -> 0xAA0000
const cssToInt = c => parseInt(c.substr(5,2)+c.substr(3,2)+c.substr(1,2),16);

function irand(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}


// the local 'this' context is manager.customData object!
// we can pass our own data's throw AnimationFrameHandler functions
function game_init(manager) {

  // Canvas Indexed 8bits buffer
  this.canvas = new CanvasPalBuffer({
    width: 160,
    height: 100,
  });
  this.canvas.palette[0] = cssToInt('#FFFFFF');
  this.canvas.palette[1] = cssToInt('#555555');
  this.canvas.palette[2] = cssToInt('#000000');
  this.canvas.palette[3] = cssToInt('#5555FF');
  this.canvas.palette[4] = cssToInt('#0000AA');
  this.canvas.palette[5] = cssToInt('#55FF55');
  this.canvas.palette[6] = cssToInt('#00AA00');
  this.canvas.palette[7] = cssToInt('#55FFFF');
  this.canvas.palette[8] = cssToInt('#00AAAA');
  this.canvas.palette[9] = cssToInt('#FF5555');
  this.canvas.palette[10] = cssToInt('#AA0000');
  this.canvas.palette[11] = cssToInt('#FF55FF');
  this.canvas.palette[12] = cssToInt('#AA00AA');
  this.canvas.palette[13] = cssToInt('#FFFF55');
  this.canvas.palette[14] = cssToInt('#AA5500');
  this.canvas.palette[15] = cssToInt('#AAAAAA');

  // Canvas Element DOM
  var ratio = 5;//window.devicePixelRatio;
  var elem = document.getElementById("canvas");
  this.canvasElem = elem;
  var ctx = elem.getContext("2d");
  elem.width  = this.canvas.width  * ratio;
  elem.height = this.canvas.height * ratio;
  elem.style.width  = elem.width + "px";
  elem.style.height = elem.height + "px";
  elem.style.backgroundColor = "rgb(255,255,255)";
  elem.style.border = "#000 1px solid";
  ctx.scale(ratio, ratio);
  
  // Conway
  this.conway = new GameOfLife({
    width: this.canvas.width,
    height: this.canvas.height,
  });
  this.conway.randomize();
}


// the local context is manager.customData object!
function game_animate(manager) {
  this.conway.animate()
  this.canvas.curbuffer.set(this.conway.grid);

  /*
  var w = this.canvas.width;
  var h = this.canvas.height;
  // pixel
  this.canvas.drawPixel(irand(0,w),irand(0,h), irand(1,13));
  // line
  this.canvas.drawBresenhamLine(irand(0,w),irand(0,h),
                                irand(0,w),irand(0,h),
                                irand(1,13));
  // circle
  var size = irand(5,10);
  this.canvas.drawCircle(irand(size,w-size),
                         irand(size,h-size),size, irand(1,13));
  */

  this.canvas.draw(this.canvasElem);
}


function main() {
  console.clear();
  var elem = document.getElementById("canvas");
  var manager = new AnimFrameManager(elem);
  

  //AnimationFrameTime.frameSkip = 8;
  manager.elementEvent['init'].add(game_init);
  manager.elementEvent['animate'].add(game_animate);

  manager.windowEvent['focus'].add(e => {
    manager.start();
    console.log("Start");
  });
  manager.windowEvent['blur'].add(e => {
    manager.pause();
    console.log("Pause");
  });

  //manager.start();
  manager.log('element');
}

