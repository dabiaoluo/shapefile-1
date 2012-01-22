#
# @file Polygon.rb Contains the Polygon class.
#
# Copyright (C) 2011 Thomas P. Lahoda
#
# This library is free software; you can redistribute it and/or
# modify it under the terms of the GNU Lesser General Public
# License as published by the Free Software Foundation; either
# version 2.1 of the License, or (at your option) any later version.
#
# This library is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
# Lesser General Public License for more details.
#
# You should have received a copy of the GNU Lesser General Public
# License along with this library; if not, write to the Free Software
# Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA
#
require 'rubygems'
require 'Shape'

module Shape
  class Polygon < Shape
    double_le :xMin
    double_le :yMin
    double_le :xMax
    double_le :yMax
    int32le :numParts
    int32le :numPoints
    array :parts, :type => :int32le, :initial_length => :numParts
    array :points, :type => :double_le, :initial_length => :numPoints
  end
end

