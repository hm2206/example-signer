import { useEffect, useRef } from 'react';
import { useWidget } from '../../hooks/useWidget';
import "../../assets/css/widget.css";

interface IPropsWidget {
  height: number
  width: number
}

export const Widget = ({ height, width }: IPropsWidget) => {
  const canvasRef: any = useRef();

  const widget = useWidget(canvasRef);

  useEffect(() => {
    if (canvasRef?.current) widget.draw();
  }, [canvasRef])

  return (
    <canvas ref={canvasRef}
      width={width}
      height={height}
      className='widget__content'
      onMouseDown={widget.handleMouseDown}
      onMouseUp={widget.handleMouseUp}
      onMouseMove={widget.handleMouseMove}
      onMouseOut={widget.handleMouseOut}
    />
  )
}