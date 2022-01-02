import React, { memo, useEffect, useRef } from 'react';
import { useWidget } from '../../hooks/useWidget';
import { TCertInfo } from '../../interfaces/certInfo';
import { ButtonWidget } from './button-widget';
import { IRectangle } from '../../interfaces/rectangle';
import { TViewport } from '../viewer/viewer-layer';

interface IPropsWidget {
  viewport: TViewport
  certInfo: TCertInfo
  page: number
  isVisibled: boolean
  onVisibled: (position: IRectangle) => void | any 
  onRectangle: (position: IRectangle) => void | any
}

const WidgetNative = ({ viewport, onRectangle, onVisibled, isVisibled }: IPropsWidget) => {
  const canvasRef: any = useRef();

  const widget = useWidget(canvasRef, viewport.scale, isVisibled);

  const toogleVisibled = () => {
    onVisibled(widget.infoPosition);
  }

  const handleSigner = (e: any) => {
    widget.handleMouseUp(e);
    onRectangle(widget.infoPosition);
  }

  useEffect(() => {
    if (isVisibled) widget.draw();
  }, [isVisibled])

  useEffect(() => {
    if (!isVisibled) widget.clear();
  }, [isVisibled]);

  return (
    <>
      <canvas ref={canvasRef}
        width={viewport.width}
        height={viewport.height}
        className='widget__canvas'
        onMouseDown={widget.handleMouseDown}
        onMouseUp={handleSigner}
        onMouseMove={widget.handleMouseMove}
      />
      <ButtonWidget
        enabled={isVisibled}
        onEnabled={toogleVisibled}
        onCancel={toogleVisibled}
      />
    </>
  )
}

export const Widget = memo(WidgetNative);