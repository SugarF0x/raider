# Markdowns

Markdowns are a specially coded strings that contain information about a specific texture to be pulled
out of a specific tileset or a shape to be drawn on canvas.

## Format

General format looks something like this: `X-Y/WIDTH-HEIGHT:X-Y/WIDTH-HEIGHT;OPTIONS`

* The first part (`X-Y/WIDTH-HEIGHT`) is responsible for on-canvas positioning
* The second part is separated by `:` and represents crop from a source image
* The third part is separated by `;` and represents options, where each letter toggles one on
    * `T` - use tileset as image source
    * `I` - use icons as image source
    * `S` - apply stroke
    * `F` - apply fill
    