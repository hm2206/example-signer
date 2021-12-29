import React, { memo, useEffect, useRef, useState } from 'react';
import { useWidget } from '../../hooks/useWidget';
import { Dialog } from '../dialog/dialog';
import { ButtonWidget } from './button-widget';
const WidgetNative = ({ height, width, certInfo, page, onSigner }) => {
    const canvasRef = useRef();
    const [enabled, setEnabled] = useState(false);
    const widget = useWidget(canvasRef, enabled);
    const [isSigner, setIsSigner] = useState(false);
    const [isVisibled, setIsVisibled] = useState(true);
    const [currentInfo, setCurrentInfo] = useState(widget.infoPosition);
    const handleClose = () => {
        setIsSigner(false);
        setEnabled(false);
        widget.clear();
    };
    const handleSigner = () => {
        setIsVisibled(true);
        setIsSigner(true);
        setCurrentInfo(widget.infoPosition);
    };
    const handleSignerInvisibled = () => {
        setIsVisibled(false);
        setIsSigner(true);
        setCurrentInfo(prev => ({ ...prev, x: 0, y: 0 }));
    };
    useEffect(() => {
        if (enabled)
            widget.draw();
    }, [enabled]);
    useEffect(() => {
        if (!enabled)
            widget.clear();
    }, [enabled]);
    return (React.createElement(React.Fragment, null,
        React.createElement("canvas", { ref: canvasRef, width: width, height: height, className: 'widget__canvas', onMouseDown: widget.handleMouseDown, onMouseUp: widget.handleMouseUp, onMouseMove: widget.handleMouseMove, onMouseOut: widget.handleMouseOut }),
        React.createElement(ButtonWidget, { enabled: enabled, onEnabled: () => setEnabled(true), onSigner: handleSigner, onSignerInvisibled: handleSignerInvisibled, onCancel: () => setEnabled(false) }),
        isSigner
            ? React.createElement(Dialog, { info: currentInfo, page: page, isVisibled: isVisibled, certInfo: certInfo, onClose: handleClose, size: { height, width }, onSigner: onSigner })
            : null));
};
export const Widget = memo(WidgetNative);
