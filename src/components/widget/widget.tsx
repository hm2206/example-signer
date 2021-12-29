import { memo, useEffect, useRef, useState } from 'react';
import { useWidget } from '../../hooks/useWidget';
import "../../assets/css/widget.css";
import { Dialog } from '../dialog/dialog';
import { TCertInfo } from '../../interfaces/certInfo';
import { ButtonWidget } from './button-widget';
import { IRectangle } from '../../interfaces/rectangle';
import { IEventSigner } from '../../interfaces/event-signet';

interface IPropsWidget {
  height: number
  width: number
  certInfo: TCertInfo
  page: number
  onSigner: (data: IEventSigner) => void | any
}

const WidgetNative = ({ height, width, certInfo, page, onSigner }: IPropsWidget) => {
  const canvasRef: any = useRef();

  const [enabled, setEnabled] = useState<boolean>(false);

  const widget = useWidget(canvasRef, enabled);

  const [isSigner, setIsSigner] = useState<boolean>(false);
  const [isVisibled, setIsVisibled] = useState<boolean>(true);
  const [currentInfo, setCurrentInfo] = useState<IRectangle>(widget.infoPosition);
  

  const handleClose = () => {
    setIsSigner(false);
    setEnabled(false);
    widget.clear();
  }

  const handleSigner = () => {
    setIsVisibled(true)
    setIsSigner(true)
    setCurrentInfo(widget.infoPosition);
  }

  const handleSignerInvisibled = () => {
    setIsVisibled(false)
    setIsSigner(true);
    setCurrentInfo(prev => ({ ...prev, x: 0, y: 0 }))
  }

  useEffect(() => {
    if (enabled) widget.draw();
  }, [enabled])

  useEffect(() => {
    if (!enabled) widget.clear();
  }, [enabled]);

  return (
    <>
      <canvas ref={canvasRef}
        width={width}
        height={height}
        className='widget__canvas'
        onMouseDown={widget.handleMouseDown}
        onMouseUp={widget.handleMouseUp}
        onMouseMove={widget.handleMouseMove}
        onMouseOut={widget.handleMouseOut}
      />
      <ButtonWidget
        enabled={enabled}
        onEnabled={() => setEnabled(true)}
        onSigner={handleSigner}
        onSignerInvisibled={handleSignerInvisibled}
        onCancel={() => setEnabled(false)}
      />
      {isSigner
        ? <Dialog
            info={currentInfo}
            page={page}
            isVisibled={isVisibled}
            certInfo={certInfo}
            onClose={handleClose}
            size={{ height, width }}
            onSigner={onSigner}
          />
        : null}
    </>
  )
}

export const Widget = memo(WidgetNative);