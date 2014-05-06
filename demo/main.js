var test = require('canvas-testbed');

var Vector2 = require('vecmath').Vector2;

var toGlyphMatrix3 = require('fontpath-vecmath').toGlyphMatrix3;
var decompose = require('../index');

var TestFont = require('fontpath-test-fonts/lib/OpenBaskerville-0.0.53.ttf');

var tmpVec = new Vector2();
var glyph = TestFont.glyphs["b"];

var shapes = decompose(glyph, {
	steps: 20,
});

//We can optionally simplify the path like so.
//Remember, they are in font units (EM) so the simplify threshold
//has to be given accordingly
for (var i=0; i<shapes.length; i++) {
	shapes[i] = shapes[i].simplify( TestFont.size * 1 );
}

//Setup a simple glyph matrix to scale from EM to screen pixels...
var glyphMatrix = toGlyphMatrix3(TestFont, glyph, 128, 20, 200);

function render(context, width, height) {
	context.clearRect(0, 0, width, height);

	for (var i=0; i<shapes.length; i++) {
		var s = shapes[i];
		for (var j=0; j<s.points.length; j++) {
			var p = s.points[j];

			tmpVec.copy(p);
			tmpVec.transformMat3(glyphMatrix);

			var sz = 2;
			context.fillRect(tmpVec.x-sz/2, tmpVec.y-sz/2, sz, sz);
		}
	}
}

//render a single frame to the canvas testbed
test(render, null, { once: true });
