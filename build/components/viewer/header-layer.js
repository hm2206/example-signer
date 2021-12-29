"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeaderLayer = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_feather_1 = require("react-feather");
const HeaderLayer = ({ onPage, onClose, total }) => {
    const [currentPage, setCurrentPage] = (0, react_1.useState)();
    const handlePage = (value) => {
        if (!value.length) {
            onPage(1);
            return setCurrentPage(null);
        }
        const currentPage = parseInt(value);
        if (currentPage <= total) {
            onPage(currentPage);
            setCurrentPage(currentPage);
        }
    };
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'viewer__header' }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'header__content' }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'header__left' }, { children: [(0, jsx_runtime_1.jsx)("input", { type: "text", onChange: ({ target }) => handlePage(target.value), className: 'header__search', placeholder: 'P\u00E1g', value: currentPage || '' }, void 0), " / ", total] }), void 0), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "header__right" }, { children: (0, jsx_runtime_1.jsx)(react_feather_1.X, { className: 'cursor__pointer', onClick: onClose }, void 0) }), void 0)] }), void 0) }), void 0));
};
exports.HeaderLayer = HeaderLayer;
