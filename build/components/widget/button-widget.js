"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonWidget = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_feather_1 = require("react-feather");
const ButtonWidget = ({ enabled, onEnabled, onSigner, onSignerInvisibled, onCancel }) => {
    if (enabled)
        return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("button", Object.assign({ className: `widget__button red`, onClick: onCancel }, { children: (0, jsx_runtime_1.jsx)(react_feather_1.X, { className: 'widget__icon red' }, void 0) }), void 0), (0, jsx_runtime_1.jsx)("button", Object.assign({ className: `widget__button signer`, onClick: onSigner }, { children: (0, jsx_runtime_1.jsx)(react_feather_1.Check, { className: 'widget__icon' }, void 0) }), void 0)] }, void 0));
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("button", Object.assign({ className: `widget__button`, onClick: onEnabled }, { children: (0, jsx_runtime_1.jsx)(react_feather_1.PenTool, { className: 'widget__icon' }, void 0) }), void 0), (0, jsx_runtime_1.jsx)("button", Object.assign({ className: `widget__button signer`, onClick: onSignerInvisibled }, { children: (0, jsx_runtime_1.jsx)(react_feather_1.Check, { className: 'widget__icon' }, void 0) }), void 0)] }, void 0));
};
exports.ButtonWidget = ButtonWidget;
