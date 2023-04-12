# CanvasPalBuffer
<img src="assets/image.png" width="600">

# Methods
## Instance
```javascript
var canvas = new CanvasPalBuffer({
    width: 160,
    height: 100,
  });
```

## Change color in the index palette (RGB32)
```javascript 
canvas.palette[0] = 0xffffff; // index0 is the clear screen
canvas.palette[1] = 0x000000; // black
```

## Draw some shapes
```javascript
// pixel
canvas.drawPixel(10,10, 1);

// line
canvas.drawBresenhamLine(0,0,30,30, 1);

// circle
var size = irand(5,10);
this.canvas.drawCircle(20,20, 10, 1);
```

