import React from 'react';
export const Cert = ({ certInfo, reason }) => {
    return (React.createElement("div", { className: 'cert__content' },
        React.createElement("div", { className: "cert__image" },
            React.createElement("img", { src: "https://firmadigital.unia.edu.pe/file?path=certificate/person_1/image/C6XH4WDRZF.jpg&disk=tmp", alt: "cert" })),
        React.createElement("div", { className: "cert__info" },
            React.createElement("b", null, certInfo?.serialNumber),
            React.createElement("div", { className: 'info__title' }, certInfo?.displayTitle),
            React.createElement("div", null, "<Fecha de Firma>"),
            React.createElement("div", null, reason))));
};
