import React, { useState } from "react";
import { roundTo } from "round-to";
import { Dialog } from '../dialog/dialog';
import { Settings, X } from 'react-feather';
export const ViewerRight = ({ certInfo, viewport, page, info, isVisibled, onSigner }) => {
    const [show, setShow] = useState(false);
    const handleSigner = (form) => {
        const clientHeight = roundTo(viewport.height / viewport.scale, 2);
        const positionX = Math.round(info?.x || 0);
        const currentY = Math.round(info?.y || 0);
        const currentH = Math.round(info?.h || 0);
        const positionY = Math.round((clientHeight - currentY) - currentH);
        const data = {
            isVisibled,
            certId: certInfo.id,
            page,
            reason: form?.reason,
            location: form?.location,
            positionX,
            positionY,
        };
        if (typeof onSigner == 'function')
            onSigner(data);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Settings, { className: "show-signer", onClick: () => setShow(true) }),
        React.createElement("div", { className: `viewer__right__content ${show ? 'active' : ''}` },
            React.createElement("div", { className: "viewer__right__header" },
                React.createElement(X, { className: "hidden-signer", onClick: () => setShow(false) }),
                "Informaci\u00F3n del Firmante"),
            React.createElement("div", { className: "viewer__right__body" },
                React.createElement(Dialog, { onSigner: handleSigner, info: info, viewport: viewport, certInfo: certInfo, page: page, isVisibled: isVisibled })))));
};
