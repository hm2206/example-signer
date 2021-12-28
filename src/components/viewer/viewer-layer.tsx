import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import * as pdfjsLib from "pdfjs-dist";
import * as pdfjsWorkerEntry from "pdfjs-dist/build/pdf.worker.entry";
import { ButtonViewer } from './button-viewer';
import { Widget } from '../widget/widget';

interface TPropsViewerLayer {
  url: string
}

interface TViewport {
  height: number 
  width: number
}

export const ViewerLayer = ({ url }: TPropsViewerLayer) => {
  const canvasRef: any = useRef();
  pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorkerEntry;

  const [pdfRef, setPdfRef] = useState<any>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentViewport, setCurrentViewport] = useState<TViewport>({
    width: 595,
    height: 842
  });

  const total = useMemo(() => {
    return pdfRef?.numPages || 1;
  }, [pdfRef]);

  const renderPage = useCallback((pageNum: number, pdf = pdfRef) => {
    pdf.getPage(pageNum).then(async (page: any) => {
      const viewport = page.getViewport({ scale: 1 });
      const canvas: any = canvasRef.current;
      canvas.height = Math.round(viewport.height);
      canvas.width = Math.round(viewport.width);
      setCurrentViewport(canvas)
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
        <div className='layer'>
          <canvas ref={canvasRef}
            width={currentViewport?.width}
            height={currentViewport?.height}
          />
          <Widget
            width={currentViewport?.width}
            height={currentViewport?.height}
          />
        </div>
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