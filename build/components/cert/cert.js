"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cert = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const Cert = ({ certInfo, reason }) => {
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'cert__content' }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "cert__image" }, { children: (0, jsx_runtime_1.jsx)("img", { src: "https://firmadigital.unia.edu.pe/file?path=certificate/person_1/image/C6XH4WDRZF.jpg&disk=tmp", alt: "cert" }, void 0) }), void 0), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "cert__info" }, { children: [(0, jsx_runtime_1.jsx)("b", { children: certInfo === null || certInfo === void 0 ? void 0 : certInfo.serialNumber }, void 0), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'info__title' }, { children: certInfo === null || certInfo === void 0 ? void 0 : certInfo.displayTitle }), void 0), (0, jsx_runtime_1.jsx)("div", { children: "<Fecha de Firma>" }, void 0), (0, jsx_runtime_1.jsx)("div", { children: reason }, void 0)] }), void 0)] }), void 0));
};
exports.Cert = Cert;
