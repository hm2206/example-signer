import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import * as pdfjsLib from "pdfjs-dist";
import * as pdfjsWorkerEntry from "pdfjs-dist/build/pdf.worker.entry";
import { ButtonViewer } from './button-viewer';
import { Widget } from '../widget/widget';

interface TPropsViewerLayer {
  url: string
}

export const ViewerLayer = ({ url }: TPropsViewerLayer) => {
  const canvasRef: any = useRef();
  pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorkerEntry;

  const [pdfRef, setPdfRef] = useState<any>();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const total = useMemo(() => {
    return pdfRef?.numPages || 1;
  }, [pdfRef]);

  const renderPage = useCallback((pageNum: number, pdf = pdfRef) => {
    pdf.getPage(pageNum).then(async (page: any) => {
      const viewport = page.getViewport({ scale: 1.5 });
      const canvas: any = canvasRef.current;
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      console.log(viewport)
      const renderContext = {
        canvasContext: canvas.getContext('2d'),
        viewport: viewport
      };
      // render
      await page.render(renderContext);
    });   
  }, [pdfRef]);

  const handlePdf = () => {
    const loadingTask = pdfjsLib.getDocument(url);
    loadingTask.promise.then((loadedPdf: any) => {
      setPdfRef(loadedPdf);
    }).catch(err => console.log(err));
  }

  useEffect(() => {
    if (pdfRef) renderPage(currentPage, pdfRef);
  }, [pdfRef, currentPage, renderPage]);

  useEffect(() => {
    if (url) handlePdf();
  }, [url]);

  const nextPage = () => currentPage < total && setCurrentPage(currentPage + 1);

  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  return (
    <div className='viewer__content'>
      <div className='viewer__header'>
        titulo
      </div>
      <div className='viewer__body'>
        <ButtonViewer type='left'
          onClick={prevPage}
        />
        <canvas ref={canvasRef}
          className='layer'
        />
        <Widget/>
        <ButtonViewer type='right'
          onClick={nextPage}
        />
      </div>
      <div className="viewer__footer">
        {currentPage} / {total}
      </div>
    </div>
  );
}