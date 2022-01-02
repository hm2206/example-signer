import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import * as pdfjsLib from "pdfjs-dist";
import { ButtonViewer } from './button-viewer';
import { Widget } from '../widget/widget';
import { HeaderLayer } from './header-layer';
import { TCertInfo } from '../../interfaces/certInfo';
import { ErrorLayer } from './error-layer';
import { IEventSigner } from '../../interfaces/event-signet';
import { useScreen } from '../../hooks/useScreen';
import { ViewerRight } from './viewer-right';
import { IRectangle } from '../..';
import { roundTo } from 'round-to';

export interface TPropsViewerLayer {
  file: File
  onClose?: () => void
  certInfo: TCertInfo
  onSigner: (data: IEventSigner) => void | any
}

export interface TViewport {
  height: number 
  width: number
  scale: number
}

export const ViewerLayer = ({ file, onClose, onSigner, certInfo }: TPropsViewerLayer) => {
  const viewerRef: any = useRef();
  const canvasRef: any = useRef();
  pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

  const screen = useScreen(viewerRef)

  const [isError, setIsError] = useState<boolean>(true);
  const [pdfRef, setPdfRef] = useState<any>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isRefresh, setIsRefresh] = useState(false);
  const [isVisibled, setIsVisibled] = useState(false);
  const [currentInfo, setCurrentInfo] = useState<IRectangle>();

  const total = useMemo(() => {
    return pdfRef?.numPages || 1;
  }, [pdfRef]);

  const [currentViewport, setCurrentViewport] = useState<TViewport>({
    width: 595,
    height: 842,
    scale: 1
  });

  const renderPage = useCallback((pageNum: number, pdf = pdfRef) => {
    pdf.getPage(pageNum).then(async (page: any) => {
      const tmpViewport: any = page.getViewport({ scale: 1 });
      const canvas: any = canvasRef.current;
      const { scale } = screen.calcSize(tmpViewport);
      const viewport = page.getViewport({ scale });
      canvas.height = roundTo(viewport.height, 2);
      canvas.width = roundTo(viewport.width, 2);
      setCurrentViewport({
        width: canvas.width,
        height: canvas.height,
        scale
      })
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

  const toogleVisibled = (rectange: IRectangle) => {
    setIsVisibled(prev => !prev);
    handleRectangle(rectange);
  }

  const handleRectangle = (rectange: IRectangle) => {
    setCurrentInfo(rectange);
  }

  const handleResizePage = () => {
    if (screen.isResize) {
      setIsRefresh(true);
      screen.setIsResize(false);
    }
  }
  
  useEffect(() => {
    if (pdfRef) renderPage(currentPage, pdfRef);
  }, [pdfRef, currentPage]);

  useEffect(() => {
    if (isRefresh) renderPage(currentPage, pdfRef);
  }, [isRefresh]);

  useEffect(() => {
    if (isRefresh) setIsRefresh(false);
  }, [isRefresh]);

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
          <div className='viewer__layer' ref={viewerRef}>
            <ButtonViewer type='left'
              onClick={prevPage}
            />
            <div className='layer' onDoubleClick={handleResizePage}>
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
                  : <Widget isVisibled={isVisibled}
                      onVisibled={toogleVisibled}
                      onRectangle={handleRectangle}
                      page={currentPage}
                      certInfo={certInfo}
                      viewport={currentViewport}
                    />
              }
            </div>
            <ButtonViewer type='right'
              onClick={nextPage}
            />
            <div className="viewer__footer">
              {currentPage} / {total}
            </div>
          </div>
          <ViewerRight
            onSigner={onSigner}
            info={currentInfo}
            viewport={currentViewport}
            page={currentPage}
            certInfo={certInfo}
            isVisibled={isVisibled}
          />
        </div>
      </div>
    </>
  );
}