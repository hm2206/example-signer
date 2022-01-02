import React, { memo, useEffect, useRef } from 'react';
import { useWidget } from '../../hooks/useWidget';
import { ButtonWidget } from './button-widget';
const WidgetNative = ({ viewport, onRectangle, onVisibled, isVisibled }) => {
    const canvasRef = useRef();
    const widget = useWidget(canvasRef, viewport.scale, isVisibled);
    const toogleVisibled = () => {
        onVisibled(widget.infoPosition);
    };
    const handleSigner = (e) => {
        widget.handleMouseUp(e);
        onRectangle(widget.infoPosition);
    };
    useEffect(() => {
        if (isVisibled)
            widget.draw();
    }, [isVisibled]);
    useEffect(() => {
        if (!isVisibled)
            widget.clear();
    }, [isVisibled]);
    return (React.createElement(React.Fragment, null,
        React.createElement("canvas", { ref: canvasRef, width: viewport.width, height: viewport.height, className: 'widget__canvas', onMouseDown: widget.handleMouseDown, onMouseUp: handleSigner, onMouseMove: widget.handleMouseMove }),
        React.createElement(ButtonWidget, { enabled: isVisibled, onEnabled: toogleVisibled, onCancel: toogleVisibled })));
};
export const Widget = memo(WidgetNative);
