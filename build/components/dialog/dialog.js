import React, { useState } from 'react';
import { Cert } from '../cert/cert';
export const Dialog = ({ onClose, onSigner, certInfo, size, isVisibled, page, info }) => {
    const [form, setForm] = useState({
        reason: "Yo Soy el firmante",
        location: "PE/PCL"
    });
    const handleSigner = () => {
        const data = {
            isVisibled,
            certId: certInfo.id,
            page,
            reason: form?.reason,
            location: form?.location,
            positionX: info?.x,
            positionY: (size.height - info.y) - info.h,
        };
        if (typeof onSigner == 'function')
            onSigner(data);
    };
    const handleForm = ({ name, value }) => {
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };
    return (React.createElement("div", { className: 'dialog__content' },
        React.createElement("div", { className: 'dialog__card' },
            React.createElement("div", { className: "dialog__header" }, "Informaci\u00F3n del Firmante"),
            React.createElement("div", { className: "dialog__body" },
                React.createElement("div", { className: "dialog__group" },
                    React.createElement("label", null, "Motivo"),
                    React.createElement("input", { type: "text", name: "reason", onChange: (e) => handleForm(e.target), className: 'dialog__input', value: form?.reason || '' })),
                React.createElement("div", { className: "dialog__group" },
                    React.createElement("label", null, "Locaci\u00F3n"),
                    React.createElement("input", { type: "text", name: "location", onChange: (e) => handleForm(e.target), className: 'dialog__input', value: form?.location || '' })),
                React.createElement("div", { className: "dialog__group" },
                    React.createElement("label", null, "Dimensi\u00F3n"),
                    React.createElement("input", { type: "text", disabled: true, readOnly: true, value: `${size.width}x${size.height}`, className: 'dialog__input' })),
                React.createElement("div", { className: "dialog__group" },
                    React.createElement("label", null,
                        "Firmar ",
                        isVisibled ? 'Visible' : 'Invisible'))),
            React.createElement("div", { className: "dialog__cert" },
                React.createElement(Cert, { reason: form?.reason || '', certInfo: certInfo })),
            React.createElement("div", { className: "dialog__footer" },
                React.createElement("button", { onClick: onClose, className: 'dialog__button red' }, "Cancelar"),
                React.createElement("button", { onClick: handleSigner, className: 'dialog__button primary' }, "Firmar")))));
};
