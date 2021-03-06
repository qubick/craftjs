var model = module.exports = require('craft').model.define()

model.name('braille')
    .author('doubleshow')
    .version('1.0.0')

//
// Parameters
//

model.parameter('text')
    .defaultValue('')

model.parameter('plate_thickness')
    .defaultValue(0.3)

model.parameter('plate_spacing')
    .defaultValue(0.5)


//
// Examples
//

model.example('hello')
    .text('hello')

model.example('12345')
    .text('12345')

// 
// Factory
//

var radius = 0.3;
var spacing = 1.5;
var distance = 3 + spacing;

var plate_height = 10;

model.factory(function($$$, params) {
    var plate_thickness = params.plate_thickness
    var plate_spacing = params.plate_spacing

    var text = params.text;
    text = text.toUpperCase();
    var csg = braille_str(text)//.center(true)

    var b = csg.getBounds()
    var h = 3 * spacing + 2 * plate_spacing
    var w = b[1].x - b[0].x + 2 * plate_spacing

    var plate = $$$.cube()
        .scale([w,h,plate_thickness])
        .translate([b[0].x - plate_spacing, plate_spacing,-plate_thickness])
    return $$$.union(csg, plate).center(true)


    // adapated from work by jaqtikkun
    // http://www.thingiverse.com/jaqtikkun/about

    // TODOS:
    // - braille contractions

    function braille_str(text) {
        var csgs = new Array();

        // tokens - this needs to be placed by code to compute contractions
        var tokens = text;

        for (var i = 0; i < tokens.length; i = i + 1) {
            if (tokens[i] == ' ') {
                // space, do nothing
            } else {
                var csg = braille_char(tokens[i]);
                csg = csg.translate([i * distance, 0, 0]);
                csg = $$$.color('black', csg);
                csgs.push(csg);
            }
        }
        return $$$.group(csgs);
    }

    function letter(bitmap) {
        var row_size = 2;
        var col_size = 3;
        var bitmap_size = row_size * col_size;

        function loc_y(loc) {
            return (3 - Math.floor(loc / row_size)) * spacing;
        }

        function loc_x(loc) {
            return loc % row_size * spacing + (distance - spacing) / 2;
        }

        var bits = new Array();
        for (var loc = 0; loc < bitmap_size; loc = loc + 1) {
            if (bitmap[loc] != 0) {
                var bit = $$$.sphere({
                        r: radius * bitmap[loc],
                        center: true,
                        fn: 10
                    })
                    .translate([loc_x(loc), loc_y(loc), 0]);
                bits.push(bit);
            }
        }
        return $$$.group(bits);
    }

    function braille_char(char) {
        if (char == "A") {
            return letter([
                1, 0,
                0, 0,
                0, 0
            ]);
        } else if (char == "B") {
            return letter([
                1, 0,
                1, 0,
                0, 0
            ]);
        } else if (char == "C") {
            return letter([
                1, 1,
                0, 0,
                0, 0
            ]);
        } else if (char == "D") {
            return letter([
                1, 1,
                0, 1,
                0, 0
            ]);
        } else if (char == "E") {
            return letter([
                1, 0,
                0, 1,
                0, 0
            ]);
        } else if (char == "F") {
            return letter([
                1, 1,
                1, 0,
                0, 0
            ]);
        } else if (char == "G") {
            return letter([
                1, 1,
                1, 1,
                0, 0
            ]);
        } else if (char == "H") {
            return letter([
                1, 0,
                1, 1,
                0, 0
            ]);
        } else if (char == "I") {
            return letter([
                0, 1,
                1, 0,
                0, 0
            ]);
        } else if (char == "J") {
            return letter([
                0, 1,
                1, 1,
                0, 0
            ]);
        } else if (char == "K") {
            return letter([
                1, 0,
                0, 0,
                1, 0
            ]);
        } else if (char == "L") {
            return letter([
                1, 0,
                1, 0,
                1, 0
            ]);
        } else if (char == "M") {
            return letter([
                1, 1,
                0, 0,
                1, 0
            ]);
        } else if (char == "N") {
            return letter([
                1, 1,
                0, 1,
                1, 0
            ]);
        } else if (char == "O") {
            return letter([
                1, 0,
                0, 1,
                1, 0
            ]);
        } else if (char == "P") {
            return letter([
                1, 1,
                1, 0,
                1, 0
            ]);
        } else if (char == "Q") {
            return letter([
                1, 1,
                1, 1,
                1, 0
            ]);
        } else if (char == "R") {
            return letter([
                1, 0,
                1, 1,
                1, 0
            ]);
        } else if (char == "S") {
            return letter([
                0, 1,
                1, 0,
                1, 0
            ]);
        } else if (char == "T") {
            return letter([
                0, 1,
                1, 1,
                1, 0
            ]);
        } else if (char == "U") {
            return letter([
                1, 0,
                0, 0,
                1, 1
            ]);
        } else if (char == "V") {
            return letter([
                1, 0,
                1, 0,
                1, 1
            ]);
        } else if (char == "W") {
            return letter([
                0, 1,
                1, 1,
                0, 1
            ]);
        } else if (char == "X") {
            return letter([
                1, 1,
                0, 0,
                1, 1
            ]);
        } else if (char == "Y") {
            return letter([
                1, 1,
                0, 1,
                1, 1
            ]);
        } else if (char == "Z") {
            return letter([
                1, 0,
                0, 1,
                1, 1
            ]);
        } else if (char == "CH") {
            return letter([
                1, 0,
                0, 0,
                0, 1
            ]);
        } else if (char == "SH") {
            return letter([
                1, 1,
                0, 0,
                0, 1
            ]);
        } else if (char == "TH") {
            return letter([
                1, 1,
                0, 1,
                0, 1
            ]);
        } else if (char == "WH") {
            return letter([
                1, 0,
                0, 1,
                0, 1
            ]);
        } else if (char == "OU") {
            return letter([
                1, 0,
                1, 1,
                0, 1
            ]);
        } else if (char == "ST") {
            return letter([
                0, 1,
                0, 0,
                1, 0
            ]);
        } else if (char == "AND") {
            return letter([
                1, 1,
                1, 0,
                1, 1
            ]);
        } else if (char == "FOR") {
            return letter([
                1, 1,
                1, 1,
                1, 1
            ]);
        } else if (char == "OF") {
            return letter([
                1, 0,
                1, 1,
                1, 1
            ]);
        } else if (char == "THE") {
            return letter([
                0, 1,
                1, 0,
                1, 1
            ]);
        } else if (char == "WITH") {
            return letter([
                0, 1,
                1, 1,
                1, 1
            ]);
        } else if (char == "IN") {
            return letter([
                0, 0,
                0, 1,
                1, 0
            ]);
        } else if (char == "EN") {
            return letter([
                0, 0,
                1, 0,
                0, 1
            ]);
        } else if (char == "CON") {
            return letter([
                0, 0,
                1, 1,
                0, 0
            ]);
        } else if (char == "DIS") {
            return letter([
                0, 0,
                1, 1,
                0, 1
            ]);
        } else if (char == "COM") {
            return letter([
                0, 0,
                0, 0,
                1, 1
            ]);
        } else if (char == "BE") {
            return letter([
                0, 0,
                1, 0,
                1, 0
            ]);
        } else if (char == "EA") {
            return letter([
                0, 0,
                1, 0,
                0, 0
            ]);
        } else if (char == "BB") {
            return letter([
                0, 0,
                1, 0,
                1, 0
            ]);
        } else if (char == "CC") {
            return letter([
                0, 0,
                1, 1,
                0, 0
            ]);
        } else if (char == "DD") {
            return letter([
                0, 0,
                1, 1,
                0, 1
            ]);
        } else if (char == "FF") {
            return letter([
                0, 0,
                1, 1,
                1, 0
            ]);
        } else if (char == "GG") {
            return letter([
                0, 0,
                1, 1,
                1, 1
            ]);
        } else if (char == "AR") {
            return letter([
                0, 1,
                0, 1,
                1, 0
            ]);
        } else if (char == "BLE") {
            return letter([
                0, 1,
                0, 1,
                1, 1
            ]);
        } else if (char == "ED") {
            return letter([
                1, 1,
                1, 0,
                0, 1
            ]);
        } else if (char == "ER") {
            return letter([
                1, 1,
                1, 1,
                0, 1
            ]);
        } else if (char == "GH") {
            return letter([
                1, 0,
                1, 0,
                0, 1
            ]);
        } else if (char == "ING") {
            return letter([
                0, 1,
                0, 0,
                1, 1
            ]);
        } else if (char == "OW") {
            return letter([
                0, 1,
                1, 0,
                0, 1
            ]);
        } else if (char == "cap") {
            return letter([
                0, 0,
                0, 0,
                0, 1
            ]);
        } else if (char == "#") {
            return letter([
                0, 1,
                0, 1,
                1, 1
            ]);
        } else if (char == "let") {
            return letter([
                0, 0,
                0, 1,
                0, 1
            ]);
        } else if (char == ".") {
            return letter([
                0, 0,
                1, 1,
                0, 1
            ]);
        } else if (char == "?") {
            return letter([
                0, 0,
                1, 0,
                1, 1
            ]);
        } else if (char == "!") {
            return letter([
                0, 0,
                1, 1,
                1, 0
            ]);
        } else if (char == "-") {
            return letter([
                0, 0,
                0, 0,
                1, 1
            ]);
        } else if (char == "quote") {
            return letter([
                0, 0,
                0, 1,
                1, 1
            ]);
        } else if (char == "1") {
            return letter([
                1, 0,
                0, 0,
                0, 0
            ]);
        } else if (char == "2") {
            return letter([
                1, 0,
                1, 0,
                0, 0
            ]);
        } else if (char == "3") {
            return letter([
                1, 1,
                0, 0,
                0, 0
            ]);
        } else if (char == "4") {
            return letter([
                1, 1,
                0, 1,
                0, 0
            ]);
        } else if (char == "5") {
            return letter([
                1, 0,
                0, 1,
                0, 0
            ]);
        } else if (char == "6") {
            return letter([
                1, 1,
                1, 0,
                0, 0
            ]);
        } else if (char == "7") {
            return letter([
                1, 1,
                1, 1,
                0, 0
            ]);
        } else if (char == "8") {
            return letter([
                1, 0,
                1, 1,
                0, 0
            ]);
        } else if (char == "9") {
            return letter([
                0, 1,
                1, 0,
                0, 0
            ]);
        } else if (char == "0") {
            return letter([
                0, 1,
                1, 1,
                0, 0
            ]);
        } else if (char == " ") {
            return letter([
                0, 0,
                0, 0,
                0, 0
            ]);
        } else {
            console.log("Invalid Character: ", char);
        }

    }
})