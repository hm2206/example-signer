"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonViewer = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_feather_1 = require("react-feather");
const ButtonViewer = ({ onClick, type }) => {
    const icon = (0, react_1.useMemo)(() => {
        return type == 'left' ? (0, jsx_runtime_1.jsx)(react_feather_1.ChevronLeft, {}, void 0) : (0, jsx_runtime_1.jsx)(react_feather_1.ChevronRight, {}, void 0);
    }, [type]);
    return ((0, jsx_runtime_1.jsx)("button", Object.assign({ className: `viewer__change__page ${type}`, onClick: onClick }, { children: icon }), void 0));
};
exports.ButtonViewer = ButtonViewer;
