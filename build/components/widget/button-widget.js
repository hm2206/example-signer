import React from 'react';
import { X, PenTool } from 'react-feather';
export const ButtonWidget = ({ enabled, onEnabled, onCancel }) => {
    if (enabled)
        return (React.createElement(React.Fragment, null,
            React.createElement("button", { className: `widget__button red`, onClick: onCancel },
                React.createElement(X, { className: 'widget__icon red' }))));
    return (React.createElement(React.Fragment, null,
        React.createElement("button", { className: `widget__button`, onClick: onEnabled },
            React.createElement(PenTool, { className: 'widget__icon' }))));
};
