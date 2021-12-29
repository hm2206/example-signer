import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import * as pdfjsLib from "pdfjs-dist";
import { ButtonViewer } from './button-viewer';
import { Widget } from '../widget/widget';
import { HeaderLayer } from './header-layer';
import { ErrorLayer } from './error-layer';
export const ViewerLayer = ({ file, onClose, onSigner, certInfo }) => {
    const canvasRef = useRef();
    pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
    const [isError, setIsError] = useState(true);
    const [pdfRef, setPdfRef] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [currentViewport, setCurrentViewport] = useState({
        width: 595,
        height: 842
    });
    const total = useMemo(() => {
        return pdfRef?.numPages || 1;
    }, [pdfRef]);
    const renderPage = useCallback((pageNum, pdf = pdfRef) => {
        pdf.getPage(pageNum).then(async (page) => {
            const viewport = page.getViewport({ scale: 1 });
            const canvas = canvasRef.current;
            canvas.height = Math.round(viewport.height);
            canvas.width = Math.round(viewport.width);
            setCurrentViewport(canvas);
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
    useEffect(() => {
        if (pdfRef)
            renderPage(currentPage, pdfRef);
    }, [pdfRef, currentPage, renderPage]);
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
                React.createElement(ButtonViewer, { type: 'left', onClick: prevPage }),
                React.createElement("div", { className: 'layer' },
                    React.createElement("canvas", { ref: canvasRef, width: currentViewport?.width, height: currentViewport?.height }),
                    isError
                        ? React.createElement(ErrorLayer, { width: currentViewport?.width || 0, height: currentViewport?.height || 0 })
                        : React.createElement(Widget, { onSigner: onSigner, page: currentPage, certInfo: certInfo, width: currentViewport?.width || 0, height: currentViewport?.height || 0 })),
                React.createElement(ButtonViewer, { type: 'right', onClick: nextPage })),
            React.createElement("div", { className: "viewer__footer" },
                currentPage,
                " / ",
                total))));
};
