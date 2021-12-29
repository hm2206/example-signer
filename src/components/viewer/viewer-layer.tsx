import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import * as pdfjsLib from "pdfjs-dist";
import { ButtonViewer } from './button-viewer';
import { Widget } from '../widget/widget';
import { HeaderLayer } from './header-layer';
import { TCertInfo } from '../../interfaces/certInfo';
import { ErrorLayer } from './error-layer';
import { IEventSigner } from '../../interfaces/event-signet';

interface TPropsViewerLayer {
  file: File
  onClose?: () => void
  certInfo: TCertInfo
  onSigner: (data: IEventSigner) => void | any
}

interface TViewport {
  height: number 
  width: number
}

export const ViewerLayer = ({ file, onClose, onSigner, certInfo }: TPropsViewerLayer) => {
  const canvasRef: any = useRef();
  pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

  const [isError, setIsError] = useState<boolean>(true);
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
    const url = URL.createObjectURL(file);
    setIsError(false);
    const loadingTask = pdfjsLib.getDocument(url);
    loadingTask.promise.then((loadedPdf: any) => {
      setPdfRef(loadedPdf);
    }).catch(() => setIsError(true));
  }
  
  useEffect(() => {
    if (pdfRef) renderPage(currentPage, pdfRef);
  }, [pdfRef, currentPage, renderPage]);

  useEffect(() => {
    if (file?.name) handlePdf();
  }, [file?.name]);

  const nextPage = () => currentPage < total && setCurrentPage(currentPage + 1);

  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  return (
    <>
      <div className='viewer__content'>
        <HeaderLayer
          onClose={onClose}
          total={total}
          onPage={(value: number) => setCurrentPage(value)}
        />
        <div className='viewer__body'>
          <ButtonViewer type='left'
            onClick={prevPage}
          />
          <div className='layer'>
            <canvas ref={canvasRef}
              width={currentViewport?.width}
              height={currentViewport?.height}
            />
            {
              isError
                ? <ErrorLayer
                    width={currentViewport?.width || 0}
                    height={currentViewport?.height || 0}
                  />
                : <Widget 
                    onSigner={onSigner}
                    page={currentPage}
                    certInfo={certInfo}
                    width={currentViewport?.width || 0}
                    height={currentViewport?.height || 0}
                  />
            }
          </div>
          <ButtonViewer type='right'
            onClick={nextPage}
          />
        </div>
        <div className="viewer__footer">
          {currentPage} / {total}
        </div>
      </div>
    </>
  );
}