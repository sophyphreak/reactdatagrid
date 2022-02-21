/**
 * Copyright © INOVUA TRADING.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import { render } from 'react-dom';
import { Flex, Item } from '../';
import '../style/index.scss';
const App = () => {
    return (React.createElement(Flex, { flex: 2, style: { width: '100vw', height: '100vh' } },
        React.createElement(Item, { flex: 1 }, "one"),
        React.createElement(Item, { flex: 2 }, "two")));
};
render(React.createElement(App, null), document.getElementById('content'));
