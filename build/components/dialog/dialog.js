"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dialog = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
require("../../assets/css/dialog.css");
const cert_1 = require("../cert/cert");
const Dialog = ({ onClose, onSigner, certInfo, size, isVisibled, page, info }) => {
    const [form, setForm] = (0, react_1.useState)({
        reason: "Yo Soy el firmante",
        location: "PE/PCL"
    });
    const handleSigner = () => {
        const data = {
            isVisibled,
            certId: certInfo.id,
            page,
            reason: form === null || form === void 0 ? void 0 : form.reason,
            location: form === null || form === void 0 ? void 0 : form.location,
            positionX: info === null || info === void 0 ? void 0 : info.x,
            positionY: (size.height - info.y) - info.h,
        };
        if (typeof onSigner == 'function')
            onSigner(data);
    };
    const handleForm = ({ name, value }) => {
        setForm(prev => (Object.assign(Object.assign({}, prev), { [name]: value })));
    };
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'dialog__content' }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'dialog__card' }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "dialog__header" }, { children: "Informaci\u00F3n del Firmante" }), void 0), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "dialog__body" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "dialog__group" }, { children: [(0, jsx_runtime_1.jsx)("label", { children: "Motivo" }, void 0), (0, jsx_runtime_1.jsx)("input", { type: "text", name: "reason", onChange: (e) => handleForm(e.target), className: 'dialog__input', value: (form === null || form === void 0 ? void 0 : form.reason) || '' }, void 0)] }), void 0), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "dialog__group" }, { children: [(0, jsx_runtime_1.jsx)("label", { children: "Locaci\u00F3n" }, void 0), (0, jsx_runtime_1.jsx)("input", { type: "text", name: "location", onChange: (e) => handleForm(e.target), className: 'dialog__input', value: (form === null || form === void 0 ? void 0 : form.location) || '' }, void 0)] }), void 0), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "dialog__group" }, { children: [(0, jsx_runtime_1.jsx)("label", { children: "Dimensi\u00F3n" }, void 0), (0, jsx_runtime_1.jsx)("input", { type: "text", disabled: true, readOnly: true, value: `${size.width}x${size.height}`, className: 'dialog__input' }, void 0)] }), void 0), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "dialog__group" }, { children: (0, jsx_runtime_1.jsxs)("label", { children: ["Firmar ", isVisibled ? 'Visible' : 'Invisible'] }, void 0) }), void 0)] }), void 0), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "dialog__cert" }, { children: (0, jsx_runtime_1.jsx)(cert_1.Cert, { reason: (form === null || form === void 0 ? void 0 : form.reason) || '', certInfo: certInfo }, void 0) }), void 0), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "dialog__footer" }, { children: [(0, jsx_runtime_1.jsx)("button", Object.assign({ onClick: onClose, className: 'dialog__button red' }, { children: "Cancelar" }), void 0), (0, jsx_runtime_1.jsx)("button", Object.assign({ onClick: handleSigner, className: 'dialog__button primary' }, { children: "Firmar" }), void 0)] }), void 0)] }), void 0) }), void 0));
};
exports.Dialog = Dialog;
