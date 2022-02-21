/**
 * Copyright © INOVUA TRADING.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { Component } from 'react';
import { render } from 'react-dom';
import 'typeface-roboto';
import ToolBar from '../src';
import '../style/index.scss';
import ResizableContainer from './ResizableContainer';
import { newButton, iconButton, deleteButton, settingsButton, menuButton, undoButton, redoButton, combo, separator, } from './toolbarChildrens';
class App extends Component {
    render() {
        return (React.createElement("div", null,
            React.createElement("div", null,
                React.createElement("div", { style: { marginBottom: 20 } },
                    "overflowStategy:",
                    ' ',
                    React.createElement("select", { value: this.state.strategy, onChange: ev => this.setState({ strategy: ev.target.value }) },
                        React.createElement("option", { value: "scroll" }, "scroll"),
                        React.createElement("option", { value: "dropdown" }, "dropdown"))),
                React.createElement(ResizableContainer, { width: '70vw' }, !this.state.clear ? (React.createElement(ToolBar, { constrainTo: true, overflowStrategy: this.state.strategy, ref: ref => (this.toolbar = ref) },
                    React.createElement("button", { onClick: () => {
                            this.setState({
                                newButton: true,
                            });
                        } }, "Add new"),
                    React.createElement("button", { onClick: () => {
                            this.setState({
                                clear: true,
                            });
                        } }, "clear"),
                    newButton,
                    iconButton,
                    deleteButton,
                    combo,
                    separator,
                    settingsButton,
                    menuButton,
                    separator,
                    undoButton,
                    redoButton,
                    this.state.newButton && (React.createElement("button", { style: { minWidth: 200 } }, "This is a new item")))) : null))));
    }
}
render(React.createElement(App, null), document.getElementById('content'));
