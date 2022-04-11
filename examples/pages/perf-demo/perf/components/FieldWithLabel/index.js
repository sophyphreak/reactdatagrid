import React from 'react';
import Label from '../Label';
import Button from '../Button';
import Select from '../Select';
const FieldWithLabel = (props) => {
    const renderChildren = () => {
        if (props.type === 'button') {
            const spinner = React.createElement("span", { className: "spinner" });
            return (React.createElement(Button, { style: { ...props.buttonStyle, width: '100%', height: 36 }, onClick: props.onClick, disabled: props.disabled }, props.loading ? spinner : props.children));
        }
        if (props.type === 'select') {
            return (React.createElement(Select, { style: {
                    ...props.selectStyle,
                    minWidth: 110,
                    maxWidth: 110,
                    height: 36,
                }, disabled: props.disabled, clearIcon: null, dataSource: props.selectData, value: props.selectValue, onChange: props.onSelectChange }));
        }
    };
    return (React.createElement("div", { className: "field-with-label-wrapper" },
        props.label ? React.createElement(Label, null, props.label) : null,
        renderChildren()));
};
export default FieldWithLabel;
