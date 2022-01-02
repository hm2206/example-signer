import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import * as pdfjsLib from "pdfjs-dist";
import { ButtonViewer } from './button-viewer';
import { Widget } from '../widget/widget';
import { HeaderLayer } from './header-layer';
import { ErrorLayer } from './error-layer';
import { useScreen } from '../../hooks/useScreen';
import { ViewerRight } from './viewer-right';
import { roundTo } from 'round-to';
export const ViewerLayer = ({ file, onClose, onSigner, certInfo }) => {
    const viewerRef = useRef();
    const canvasRef = useRef();
    pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
    const screen = useScreen(viewerRef);
    const [isError, setIsError] = useState(true);
    const [pdfRef, setPdfRef] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [isRefresh, setIsRefresh] = useState(false);
    const [isVisibled, setIsVisibled] = useState(false);
    const [currentInfo, setCurrentInfo] = useState();
    const total = useMemo(() => {
        return pdfRef?.numPages || 1;
    }, [pdfRef]);
    const [currentViewport, setCurrentViewport] = useState({
        width: 595,
        height: 842,
        scale: 1
    });
    const renderPage = useCallback((pageNum, pdf = pdfRef) => {
        pdf.getPage(pageNum).then(async (page) => {
            const tmpViewport = page.getViewport({ scale: 1 });
            const canvas = canvasRef.current;
            const { scale } = screen.calcSize(tmpViewport);
            const viewport = page.getViewport({ scale });
            canvas.height = roundTo(viewport.height, 2);
            canvas.width = roundTo(viewport.width, 2);
            setCurrentViewport({
                width: canvas.width,
                height: canvas.height,
                scale
            });
            const renderContext = {
                canvasContext: canvas.getContext('2d'),
                viewport: viewport
            };
            await page.render(renderContext);
        });
    }, [pdfRef]);
    const handlePdf = () => {
        const url = URL.createObjectURL(file);
        setIsError(false);
        const loadingTask = pdfjsLib.getDocument(url);
        loadingTask.promise.then((loadedPdf) => {
            setPdfRef(loadedPdf);
        }).catch(() => setIsError(true));
    };
    const toogleVisibled = (rectange) => {
        setIsVisibled(prev => !prev);
        handleRectangle(rectange);
    };
    const handleRectangle = (rectange) => {
        setCurrentInfo(rectange);
    };
    const handleResizePage = () => {
        if (screen.isResize) {
            setIsRefresh(true);
            screen.setIsResize(false);
        }
    };
    useEffect(() => {
        if (pdfRef)
            renderPage(currentPage, pdfRef);
    }, [pdfRef, currentPage]);
    useEffect(() => {
        if (isRefresh)
            renderPage(currentPage, pdfRef);
    }, [isRefresh]);
    useEffect(() => {
        if (isRefresh)
            setIsRefresh(false);
    }, [isRefresh]);
    useEffect(() => {
        if (file?.name)
            handlePdf();
    }, [file?.name]);
    const nextPage = () => currentPage < total && setCurrentPage(currentPage + 1);
    const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: 'viewer__content' },
            React.createElement(HeaderLayer, { onClose: onClose, total: total, onPage: (value) => setCurrentPage(value) }),
            React.createElement("div", { className: 'viewer__body' },
                React.createElement("div", { className: 'viewer__layer', ref: viewerRef },
                    React.createElement(ButtonViewer, { type: 'left', onClick: prevPage }),
                    React.createElement("div", { className: 'layer', onDoubleClick: handleResizePage },
                        React.createElement("canvas", { ref: canvasRef, width: currentViewport?.width, height: currentViewport?.height }),
                        isError
                            ? React.createElement(ErrorLayer, { width: currentViewport?.width || 0, height: currentViewport?.height || 0 })
                            : React.createElement(Widget, { isVisibled: isVisibled, onVisibled: toogleVisibled, onRectangle: handleRectangle, page: currentPage, certInfo: certInfo, viewport: currentViewport })),
                    React.createElement(ButtonViewer, { type: 'right', onClick: nextPage }),
                    React.createElement("div", { className: "viewer__footer" },
                        currentPage,
                        " / ",
                        total)),
                React.createElement(ViewerRight, { onSigner: onSigner, info: currentInfo, viewport: currentViewport, page: currentPage, certInfo: certInfo, isVisibled: isVisibled })))));
};
