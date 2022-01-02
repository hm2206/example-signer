import React from 'react';
import image from '../../../src/image/logo.png';
export const Cert = ({ certInfo, reason, urlImage, isVisibled }) => {
    return (React.createElement("div", { className: `cert__content ${isVisibled ? 'active' : ''}` },
        React.createElement("div", { className: "cert__image" },
            React.createElement("img", { src: urlImage ? urlImage : image, alt: "cert" })),
        React.createElement("div", { className: "cert__info" },
            React.createElement("b", null, certInfo?.serialNumber),
            React.createElement("div", { className: 'info__title' }, certInfo?.displayTitle),
            React.createElement("div", null, "<Fecha de Firma>"),
            React.createElement("div", null, reason))));
};
