import React, { useState } from 'react';
import { Cert } from '../cert/cert';
export const Dialog = ({ onSigner, certInfo, page, isVisibled }) => {
    const [form, setForm] = useState({
        reason: "Yo Soy el firmante",
        location: "PE/PCL"
    });
    const handleForm = ({ name, value }) => {
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };
    return (React.createElement("div", { className: 'dialog__card' },
        React.createElement("div", { className: "dialog__body" },
            React.createElement("div", { className: "dialog__group" },
                React.createElement("label", null, "Motivo"),
                React.createElement("input", { type: "text", name: "reason", onChange: (e) => handleForm(e.target), className: 'dialog__input', value: form?.reason || '' })),
            React.createElement("div", { className: "dialog__group" },
                React.createElement("label", null, "Locaci\u00F3n"),
                React.createElement("input", { type: "text", name: "location", onChange: (e) => handleForm(e.target), className: 'dialog__input', value: form?.location || '' })),
            React.createElement("div", { className: "dialog__group" },
                React.createElement("label", null, "P\u00E1gina"),
                React.createElement("input", { type: "text", disabled: true, readOnly: true, value: page || 1, className: 'dialog__input' }))),
        React.createElement("div", { className: "dialog__cert" },
            React.createElement(Cert, { reason: form?.reason || '', isVisibled: isVisibled, certInfo: certInfo, urlImage: certInfo.urlImage })),
        React.createElement("div", { className: "dialog__footer" },
            React.createElement("button", { onClick: () => onSigner(form), className: 'dialog__button primary' }, "Firmar"))));
};
