"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewerLayer = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const pdfjsLib = __importStar(require("pdfjs-dist"));
const button_viewer_1 = require("./button-viewer");
const widget_1 = require("../widget/widget");
const header_layer_1 = require("./header-layer");
const error_layer_1 = require("./error-layer");
const ViewerLayer = ({ file, onClose, onSigner, certInfo }) => {
    const canvasRef = (0, react_1.useRef)();
    pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
    const [isError, setIsError] = (0, react_1.useState)(true);
    const [pdfRef, setPdfRef] = (0, react_1.useState)();
    const [currentPage, setCurrentPage] = (0, react_1.useState)(1);
    const [currentViewport, setCurrentViewport] = (0, react_1.useState)({
        width: 595,
        height: 842
    });
    const total = (0, react_1.useMemo)(() => {
        return (pdfRef === null || pdfRef === void 0 ? void 0 : pdfRef.numPages) || 1;
    }, [pdfRef]);
    const renderPage = (0, react_1.useCallback)((pageNum, pdf = pdfRef) => {
        pdf.getPage(pageNum).then((page) => __awaiter(void 0, void 0, void 0, function* () {
            const viewport = page.getViewport({ scale: 1 });
            const canvas = canvasRef.current;
            canvas.height = Math.round(viewport.height);
            canvas.width = Math.round(viewport.width);
            setCurrentViewport(canvas);
            const renderContext = {
                canvasContext: canvas.getContext('2d'),
                viewport: viewport
            };
            yield page.render(renderContext);
        }));
    }, [pdfRef]);
    const handlePdf = () => {
        const url = URL.createObjectURL(file);
        setIsError(false);
        const loadingTask = pdfjsLib.getDocument(url);
        loadingTask.promise.then((loadedPdf) => {
            setPdfRef(loadedPdf);
        }).catch(() => setIsError(true));
    };
    (0, react_1.useEffect)(() => {
        if (pdfRef)
            renderPage(currentPage, pdfRef);
    }, [pdfRef, currentPage, renderPage]);
    (0, react_1.useEffect)(() => {
        if (file === null || file === void 0 ? void 0 : file.name)
            handlePdf();
    }, [file === null || file === void 0 ? void 0 : file.name]);
    const nextPage = () => currentPage < total && setCurrentPage(currentPage + 1);
    const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'viewer__content' }, { children: [(0, jsx_runtime_1.jsx)(header_layer_1.HeaderLayer, { onClose: onClose, total: total, onPage: (value) => setCurrentPage(value) }, void 0), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'viewer__body' }, { children: [(0, jsx_runtime_1.jsx)(button_viewer_1.ButtonViewer, { type: 'left', onClick: prevPage }, void 0), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'layer' }, { children: [(0, jsx_runtime_1.jsx)("canvas", { ref: canvasRef, width: currentViewport === null || currentViewport === void 0 ? void 0 : currentViewport.width, height: currentViewport === null || currentViewport === void 0 ? void 0 : currentViewport.height }, void 0), isError
                                    ? (0, jsx_runtime_1.jsx)(error_layer_1.ErrorLayer, { width: (currentViewport === null || currentViewport === void 0 ? void 0 : currentViewport.width) || 0, height: (currentViewport === null || currentViewport === void 0 ? void 0 : currentViewport.height) || 0 }, void 0)
                                    : (0, jsx_runtime_1.jsx)(widget_1.Widget, { onSigner: onSigner, page: currentPage, certInfo: certInfo, width: (currentViewport === null || currentViewport === void 0 ? void 0 : currentViewport.width) || 0, height: (currentViewport === null || currentViewport === void 0 ? void 0 : currentViewport.height) || 0 }, void 0)] }), void 0), (0, jsx_runtime_1.jsx)(button_viewer_1.ButtonViewer, { type: 'right', onClick: nextPage }, void 0)] }), void 0), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "viewer__footer" }, { children: [currentPage, " / ", total] }), void 0)] }), void 0) }, void 0));
};
exports.ViewerLayer = ViewerLayer;
