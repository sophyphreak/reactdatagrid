/**
 * Copyright © INOVUA TRADING.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

import curry from './curry';
import nativeMatches from '../matches';

var matches: any;

export default curry(function(selector: string, node: any) {
  matches = matches || nativeMatches;

  while ((node = node.parentElement)) {
    if (matches.call(node, selector)) {
      return node;
    }
  }
});
