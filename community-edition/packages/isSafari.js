/**
 * Copyright © INOVUA TRADING.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { getGlobal } from '../getGlobal';
const globalObject = getGlobal();
let IS_SAFARI;
export default () => {
    if (IS_SAFARI !== undefined) {
        return IS_SAFARI;
    }
    const ua = globalObject.navigator
        ? globalObject.navigator.userAgent
        : '';
    return (IS_SAFARI =
        ua.indexOf('Safari') !== -1 && ua.indexOf('Chrome') === -1);
};
