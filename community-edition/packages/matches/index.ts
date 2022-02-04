/**
 * Copyright © INOVUA TRADING.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const getGlobal = require('../../getGlobal');
const globalObject = getGlobal();

var proto = globalObject.Element ? globalObject.Element.prototype : {};

var nativeMatches =
  proto.matches ||
  proto.mozMatchesSelector ||
  proto.msMatchesSelector ||
  proto.oMatchesSelector ||
  proto.webkitMatchesSelector;

module.exports = nativeMatches;
