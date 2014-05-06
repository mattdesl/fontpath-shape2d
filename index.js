var Shape = require('shape2d');

var funcs = {
    'm': 'moveTo',
    'l': 'lineTo',
    'q': 'quadraticCurveTo',
    'c': 'bezierCurveTo'
};

/**
 * Decomposes a glyph and its outline from fontpath into a list of Shapes from shape2d.
 * This is a discrete set of points that can then be used for triangulation
 * or further effects.
 */
module.exports = function(glyph, options) {
    options = options||{};

    var curves = Boolean(options.approximateCurves);
    var steps = options.steps||10;
    var factor = options.approximationFactor;
    factor = (typeof factor==="number") ? factor : 0.5;

    var shapes = [];
    var shape = new Shape();
    shape.approximateCurves = curves;
    shape.approximationFactor = factor;
    shape.steps = steps;

    if (!glyph.path || glyph.path.length===0)
        return shapes;

    var path = glyph.path;
    for (var i=0; i<path.length; i++) {
        var p = path[i];
        var args = p.slice(1);
        var fkey = funcs[ p[0] ];

        //assume we are on a new shape when we reach a moveto
        //will have to revisit this with a better solution 
        //maybe even-odd rule
        if (i!==0 && fkey==='moveTo') {
            //push the current shape ahead..
            shapes.push(shape);

            shape = new Shape();
            shape.approximateCurves = curves;
            shape.approximationFactor = factor;
            shape.steps = steps;
        }

        shape[fkey].apply(shape, args);
    }

    shapes.push(shape);
    return shapes;
}