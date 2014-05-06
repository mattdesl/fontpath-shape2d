var TestFont = require('fontpath-test-fonts/lib/OpenBaskerville-0.0.53.ttf');
var decompose = require('./index');

var test = require('tap').test;

var glyph = TestFont.glyphs["i"];
var shapes = decompose(glyph);

test("decompose a glyph into outlines", function(t) {
	t.ok(shapes.length === 2, "correct number of shapes");
	t.end();
})