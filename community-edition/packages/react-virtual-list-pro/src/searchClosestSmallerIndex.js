/**
 * Copyright © INOVUA TRADING.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import search from './searchClosestSmallerValue';
import { getGlobal } from '../../../getGlobal';
const globalObject = getGlobal();
export default globalObject.s = (array, value) => {
    const keys = Object.keys(array).map(k => k * 1);
    const result = search(keys, value);
    if (result != -1) {
        return keys[result] * 1;
    }
    return -1;
};
