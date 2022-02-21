/**
 * Copyright © INOVUA TRADING.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { getGlobal } from './getGlobal';
const globalObject = getGlobal();
const ua = globalObject.navigator ? globalObject.navigator.userAgent || '' : '';
export const IS_EDGE = ua.indexOf('Edge/') !== -1;
export const IS_MS_BROWSER = IS_EDGE || ua.indexOf('Trident') !== -1;
export const IS_IE = IS_MS_BROWSER && !IS_EDGE;
