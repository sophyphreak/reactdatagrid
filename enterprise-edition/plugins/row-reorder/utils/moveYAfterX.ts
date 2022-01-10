/**
 * Copyright © INOVUA TRADING.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const moveYAfterX = (array: any, from: number | number[], to: number) => {
  if (!Array.isArray(array)) {
    array = [];
  }
  const result: any = [].concat(array);

  const len = array.length;
  if (
    from === to ||
    !len ||
    from == null ||
    to == null ||
    from >= len ||
    to > len
  ) {
    return result;
  }
  from = Array.isArray(from) ? from : [from];

  const values: any = from.map(index => array[index]).reverse();

  // remove all from numbers, one at a time
  const emptyArray: any = [];
  emptyArray
    .concat(from)
    .sort((a: number, b: number) => b - a)
    .forEach((index: number) => {
      result.splice(index, 1);
    });

  from.reverse().forEach((_: any, i: number) => {
    result.splice(to, 0, values[i]);
  });

  return result;
};

export default moveYAfterX;
