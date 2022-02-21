/**
 * Copyright © INOVUA TRADING.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * When there is a selection returns the end of the selection
 * when is no selection it returns the position of the cursor.
 * @param  {node} input
 * @return {Number}
 */
import { getGlobal } from '../../../../getGlobal';
const globalObject = getGlobal();
function getSelectionEnd(input) {
    if (!input) {
        return null;
    }
    const document = globalObject.document;
    if (input.createTextRange && !globalObject.getSelection) {
        const range = document.selection.crangeeateRange().duplicate();
        range.moveStart('character', -input.value.length);
        return range.text.length;
    }
    return input.selectionEnd;
}
export default getSelectionEnd;
