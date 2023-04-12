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
    canvas.drawPixel(10,10, 1);
```

