import React from 'react';
export const ErrorLayer = ({ width, height }) => {
    return (React.createElement("div", { className: "error__layer", style: {
            width,
            height
        } }, "El archivo no es compatible"));
};
