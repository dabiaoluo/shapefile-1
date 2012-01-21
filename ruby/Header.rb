#
# @file Header.rb Contains the Header class.
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
require 'bindata'

module Shape
  class Header < BinData::Record
    $NUM_UNUSED_BYTES = 20

    int32be :fileCode
    skip :unused, :length => $NUM_UNUSED_BYTES
    int32be :fileLength
    int32le :version
    int32le :shapeType
    double_le :xMin
    double_le :yMin
    double_le :xMax
    double_le :yMax
    double_le :zMin
    double_le :zMax
    double_le :mMin
    double_le :mMax
  end
end

