import { memo, useEffect, useRef, useState } from 'react';
import { useWidget } from '../../hooks/useWidget';
import { PenTool, X, Check } from 'react-feather';
import "../../assets/css/widget.css";

interface IPropsWidget {
  height: number
  width: number
}

const WidgetNative = ({ height, width }: IPropsWidget) => {
  const canvasRef: any = useRef();

  const [enabled, setEnabled] = useState<boolean>(false);
  
  const widget = useWidget(canvasRef, enabled);

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
      <button className={`widget__button ${enabled ? 'red' : ''}`}
        onClick={() => setEnabled(prev => !prev)}
      >
        {enabled
          ? <X className='widget__icon red'/> 
          : <PenTool className='widget__icon' />
        }
      </button>
      {/* confirmar */}
      {enabled
        ? (
          <button className={`widget__button signer`}>
            <Check className='widget__icon green'/>
          </button>
        )
        : ''
      }
    </>
  )
}

export const Widget = memo(WidgetNative);