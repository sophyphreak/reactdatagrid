import React from 'react';
const Label = (props) => {
    return React.createElement("label", { className: "label" }, props.children);
};
export default Label;
