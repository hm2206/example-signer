import React, { useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'react-feather';
export const ButtonViewer = ({ onClick, type }) => {
    const icon = useMemo(() => {
        return type == 'left' ? React.createElement(ChevronLeft, null) : React.createElement(ChevronRight, null);
    }, [type]);
    return (React.createElement("button", { className: `viewer__change__page ${type}`, onClick: onClick }, icon));
};
