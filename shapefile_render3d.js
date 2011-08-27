/**
 * \file shapefile_render3d.js
 * Contains the shapefile three dimensional render functions.
 *
 * Copyright (C) 2011 Thomas P. Lahoda
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA
 */

/**
 * Renders a polygon in a 3d.
 *
 * \param shape The polygon to render.
 * \param context The context onto which to render the polygon.
 */
function PolygonRenderer3d (shape, context) {
  //the innards of this loop are going to change, just pass array of vertices into webgl.
  for (var j = 0; j < shape.header[5]; ++j) {
    var startPoint = shape.parts[j][0];
    context.beginPath ();
    //context.moveTo (startPoint[0], startPoint[1]);
    
    for (var k = 1; k < shape.parts[j].length; ++k) {
      var temp = shape.parts[j][k];
      //context.lineTo (temp[0], temp[1]);
    }
    context.stroke ();
    context.closePath ();
  }
}

/**
 * Calls the appropriate renderer.
 *
 * \param shape The polygon to render.
 * \param context The context onto which to render the polygon.
 */
function RenderFactory3d (shape, context) {
  switch (shape.header[0]) {
    case 0:
      //NullShape does not need rendering.
      break;
    case 3:
      //Polyline has the same structure as Polygon so using it for now.
      PolygonRenderer3d (shape, context);
      break;
    case 5:
      PolygonRenderer3d (shape, context);
      break;
    case 1:
    case 8:
    case 11:
    case 13:
    case 15:
    case 18:
    case 21:
    case 23:
    case 25:
    case 28:
    case 31:
      throw "Shape type rendering not implemented.";
      break;
    default:
      throw "Shape type unknown.";
  }
}

/**
 * Renders a shapefile in 3d.
 *
 * \param shapeFile The shapefile.
 * \param context The canvas onto which to draw.
 * \param color, The color to render the shapes.
 */
function render3d (shapeFile, context, color) {
  context.strokeStyle = color;
  for (var i = 0; i < shapeFile.header.numShapes; ++i) {
    RenderFactory3d (shapeFile.shapes[i], context);
}

