/**
 * Copyright © INOVUA TRADING.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { getGlobal } from '../../getGlobal';
const globalObject = getGlobal();
export default !!('ontouchstart' in globalObject ||
    (globalObject.DocumentTouch &&
        document instanceof DocumentTouch));
