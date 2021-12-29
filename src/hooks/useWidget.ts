import { useEffect } from "react"
import { IRectangle } from "../interfaces/rectangle";

export interface IPropsWidget {
  current: any
}

export const useWidget = (canvas: IPropsWidget, active: boolean = false) => {

  let isDown: boolean = false;
  let dragTarget: IRectangle | any = null;
  let startX: any = null;
  let startY: any = null;
  const info: IRectangle = {
    x: 10, y: 10, w: 150, h: 70
  }

  const infoPosition: IRectangle = info;

  const initilize = () => {
    const canvasEle: any = canvas.current;
    canvasEle.width = canvasEle.clientWidth;
    canvasEle.height = canvasEle.clientHeight;
  }

  // draw rectangle
  const draw = () => {
    clear();
    if (!active) return; 
    drawFillRect(info);
  }

  // clear draw
  const clear = () => {
    const ctx = canvas.current.getContext('2d');
    ctx.clearRect(0, 0,
      canvas.current.clientWidth,
      canvas.current.clientHeight
    );
  }

  // draw rectangle with background
  const drawFillRect = (tmpInfo: IRectangle) => {
    const { x, y, w, h } = tmpInfo;
    const backgroundColor = 'rgba(79, 195, 247, 0.7)';
    const ctx = canvas.current.getContext('2d');
    // dibujar
    ctx.beginPath();
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(x, y, w, h);
  }

  // identify the click event in the rectangle
  const hitBox = (x: number, y: number): boolean => {
    let isTarget = false;
    if (x >= info.x && x <= info.x + info.w && y >= info.y && y <= info.y + info.h) {
      dragTarget = info;
      isTarget = true;
    }

    return isTarget;
  }

  const handleMouseDown = (e: any) => {
    startX = parseInt(`${e.nativeEvent.offsetX - canvas.current.clientLeft}`);
    startY = parseInt(`${e.nativeEvent.offsetY - canvas.current.clientTop}`);
    isDown = hitBox(startX, startY);
  }

  const handleMouseMove = (e: any) => {
    if (!isDown) return;

    const mouseX = parseInt(`${e.nativeEvent.offsetX - canvas.current.clientLeft}`);
    const mouseY = parseInt(`${e.nativeEvent.offsetY - canvas.current.clientTop}`);
    const dx = mouseX - startX;
    const dy = mouseY - startY;
    startX = mouseX;
    startY = mouseY;
    dragTarget.x += dx;
    dragTarget.y += dy;
    draw();
  }

  const handleMouseUp = (e: any, isRecord?: boolean | undefined) => { 
    if (!isRecord) {
      infoPosition.x = dragTarget?.x;
      infoPosition.y = dragTarget?.y;
      infoPosition.h = dragTarget?.h;
      infoPosition.w = dragTarget?.w;
    }
    // clear target
    dragTarget = null;
    isDown = false;
  }

  const handleMouseOut = (e: any) => {
    handleMouseUp(e, true);
  }

  useEffect(() => {
    if (canvas?.current) initilize();
  }, [canvas]);

  return {
    infoPosition,
    draw,
    clear,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseOut
  }
}