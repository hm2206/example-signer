import { memo, useEffect, useRef, useState } from 'react';
import { useWidget } from '../../hooks/useWidget';
import { PenTool, X, Check } from 'react-feather';
import "../../assets/css/widget.css";
import { Dialog } from '../dialog/dialog';
import { TCertInfo } from '../../interfaces/certInfo';
import { ButtonWidget } from './button-widget';

interface IPropsWidget {
  height: number
  width: number
  certInfo: TCertInfo
}

const WidgetNative = ({ height, width, certInfo }: IPropsWidget) => {
  const canvasRef: any = useRef();

  const [enabled, setEnabled] = useState<boolean>(false);
  const [isSigner, setIsSigner] = useState<boolean>(false);
  const [isVisibled, setIsVisibled] = useState<boolean>(true);
  
  const widget = useWidget(canvasRef, enabled);

  const handleClose = () => {
    setIsSigner(false);
    setEnabled(false);
    widget.clear();
  }

  const handleSigner = () => {
    setIsVisibled(true)
    setIsSigner(true)
  }

  const handleSignerInvisibled = () => {
    setIsVisibled(false)
    setIsSigner(true);
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
            isVisibled={isVisibled}
            certInfo={certInfo}
            onClose={handleClose}
            size={{ height, width }}
          />
        : null}
    </>
  )
}

export const Widget = memo(WidgetNative);