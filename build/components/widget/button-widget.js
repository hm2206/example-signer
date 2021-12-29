import React from 'react';
import { Check, X, PenTool } from 'react-feather';
export const ButtonWidget = ({ enabled, onEnabled, onSigner, onSignerInvisibled, onCancel }) => {
    if (enabled)
        return (React.createElement(React.Fragment, null,
            React.createElement("button", { className: `widget__button red`, onClick: onCancel },
                React.createElement(X, { className: 'widget__icon red' })),
            React.createElement("button", { className: `widget__button signer`, onClick: onSigner },
                React.createElement(Check, { className: 'widget__icon' }))));
    return (React.createElement(React.Fragment, null,
        React.createElement("button", { className: `widget__button`, onClick: onEnabled },
            React.createElement(PenTool, { className: 'widget__icon' })),
        React.createElement("button", { className: `widget__button signer`, onClick: onSignerInvisibled },
            React.createElement(Check, { className: 'widget__icon' }))));
};
