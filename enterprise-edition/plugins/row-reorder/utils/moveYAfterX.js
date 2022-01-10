/**
 * Copyright © INOVUA TRADING.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const moveYAfterX = (array, from, to) => {
    if (!Array.isArray(array)) {
        array = [];
    }
    const result = [].concat(array);
    const len = array.length;
    if (from === to ||
        !len ||
        from == null ||
        to == null ||
        from >= len ||
        to > len) {
        return result;
    }
    from = Array.isArray(from) ? from : [from];
    const values = from.map(index => array[index]).reverse();
    // remove all from numbers, one at a time
    const emptyArray = [];
    emptyArray
        .concat(from)
        .sort((a, b) => b - a)
        .forEach((index) => {
        result.splice(index, 1);
    });
    from.reverse().forEach((_, i) => {
        result.splice(to, 0, values[i]);
    });
    return result;
};
export default moveYAfterX;
