import React, { useState } from 'react';
import { X } from 'react-feather';
export const HeaderLayer = ({ onPage, onClose, total }) => {
    const [currentPage, setCurrentPage] = useState();
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
    return (React.createElement("div", { className: 'viewer__header' },
        React.createElement("div", { className: 'header__content' },
            React.createElement("div", { className: 'header__left' },
                React.createElement("input", { type: "text", onChange: ({ target }) => handlePage(target.value), className: 'header__search', placeholder: 'P\u00E1g', value: currentPage || '' }),
                " / ",
                total),
            React.createElement("div", { className: "header__right" },
                React.createElement(X, { className: 'cursor__pointer', onClick: onClose })))));
};
