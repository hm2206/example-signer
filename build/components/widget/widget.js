"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Widget = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const useWidget_1 = require("../../hooks/useWidget");
require("../../assets/css/widget.css");
const dialog_1 = require("../dialog/dialog");
const button_widget_1 = require("./button-widget");
const WidgetNative = ({ height, width, certInfo, page, onSigner }) => {
    const canvasRef = (0, react_1.useRef)();
    const [enabled, setEnabled] = (0, react_1.useState)(false);
    const widget = (0, useWidget_1.useWidget)(canvasRef, enabled);
    const [isSigner, setIsSigner] = (0, react_1.useState)(false);
    const [isVisibled, setIsVisibled] = (0, react_1.useState)(true);
    const [currentInfo, setCurrentInfo] = (0, react_1.useState)(widget.infoPosition);
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
        setCurrentInfo(prev => (Object.assign(Object.assign({}, prev), { x: 0, y: 0 })));
    };
    (0, react_1.useEffect)(() => {
        if (enabled)
            widget.draw();
    }, [enabled]);
    (0, react_1.useEffect)(() => {
        if (!enabled)
            widget.clear();
    }, [enabled]);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("canvas", { ref: canvasRef, width: width, height: height, className: 'widget__canvas', onMouseDown: widget.handleMouseDown, onMouseUp: widget.handleMouseUp, onMouseMove: widget.handleMouseMove, onMouseOut: widget.handleMouseOut }, void 0), (0, jsx_runtime_1.jsx)(button_widget_1.ButtonWidget, { enabled: enabled, onEnabled: () => setEnabled(true), onSigner: handleSigner, onSignerInvisibled: handleSignerInvisibled, onCancel: () => setEnabled(false) }, void 0), isSigner
                ? (0, jsx_runtime_1.jsx)(dialog_1.Dialog, { info: currentInfo, page: page, isVisibled: isVisibled, certInfo: certInfo, onClose: handleClose, size: { height, width }, onSigner: onSigner }, void 0)
                : null] }, void 0));
};
exports.Widget = (0, react_1.memo)(WidgetNative);
