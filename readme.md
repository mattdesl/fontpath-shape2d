# about

Decompose a glyph outline generated from [fontpath](https://github.com/mattdesl/fontpath) into a discrete set of points, using [shape2d](https://github.com/mattdesl/fontpath).

The curve/bezier approximation and simplification algorithms are very crude, but performant and sufficient for simple output.

# example

```js
//Get the data from fontpath tool 
var Lato = require('./myfonts/Lato-Bold.ttf.json');

var decompose = require('fontpath-shape2d');

//decompose a glyph
var glyph = Lato.glyphs["b"];
var shapes = decompose(glyph, {
	steps: 20
});

//Returns a list of shapes, e.g. the dot and stem of 'i' 
for (var i=0; i < shapes.length; i++) {
	var s = shapes[i];

	//Each shape has a list of points, as Vector2 objects
	for (var j=0; j < s.points.length; j++) {
		var p = s.points[j];

		//...
	}
}
```

# demo

For a complete example, see the [demo](demo/main.js). You can run it with beefy:

```bash
cd fontpath-shape2d

#install the tools globally
npm install beefy browserify -g

#install our dependencies
npm install

#now run the demo
beefy demo/main.js
```

Result:  
![Output](http://i.imgur.com/1M4UAnz.png)