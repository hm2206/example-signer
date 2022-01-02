import { useEffect } from "react"
import { IRectangle } from "../interfaces/rectangle";
import { roundTo } from "round-to";

export interface IPropsWidget {
  current: any
}

export const useWidget = (canvas: IPropsWidget, scale: number = 1, active: boolean = false) => {

  let isDown: boolean = false;
  let dragTarget: IRectangle | any = null;
  let startX: any = null;
  let startY: any = null;
  const info: IRectangle = {
    x: 10, y: 10, w: roundTo(150 * scale, 2), h: roundTo(70 * scale, 2)
  }

  let infoPosition: IRectangle = Object.assign({}, {
    x: info.x,
    y: info.y,
    h: roundTo(info.h / scale, 2),
    w: roundTo(info.w / scale, 2)
  });

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
  const drawFillRect = (tmpInfo: IRectangle, opacity: number = 0.5) => {
    const { x, y, w, h } = tmpInfo;
    const ctx = canvas.current.getContext('2d');
    // dibujar
    ctx.beginPath();
    ctx.fillStyle = `rgba(79, 195, 247, ${opacity})`;
    ctx.fillRect(roundTo(x, 2), roundTo(y, 2), roundTo(w, 2), roundTo(h, 2));
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
    startX = parseFloat(`${e.nativeEvent.offsetX - canvas.current.clientLeft}`);
    startY = parseFloat(`${e.nativeEvent.offsetY - canvas.current.clientTop}`);
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

  const handleMouseUp = (e: any) => { 
    if (isDown) {
      drawFillRect(info, 0.7);
      infoPosition.x = roundTo(info?.x / scale, 2);
      infoPosition.y = roundTo(info?.y / scale, 2);
      infoPosition.h = roundTo(info?.h / scale, 2);
      infoPosition.w = roundTo(info?.w / scale, 2);
      isDown = false;
      dragTarget = null;
      clearInfo();
    }
  }

  const clearInfo = () => {
    info.x = 0;
    info.y = 0;
    info.w = 0;
    info.h = 0;
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
  }
}