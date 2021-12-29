"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorLayer = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const ErrorLayer = ({ width, height }) => {
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: "error__layer", style: {
            width,
            height
        } }, { children: "El archivo no es compatible" }), void 0));
};
exports.ErrorLayer = ErrorLayer;
