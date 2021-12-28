import { useEffect, useState } from "react"

interface IRectangle {
  x: number
  y: number
  w: number 
  h: number
} 

interface IPropsWidget {
  current: any
}

export const useWidget = (canvas: IPropsWidget, active: boolean = false) => {

  const boxes: IRectangle[] = [
    { x: 10, y: 10, w: 150, h: 70 },
  ]

  let isDown: boolean = false;
  let dragTarget: any = null;
  let startX: any = null;
  let startY: any = null;

  const initilize = () => {
    const canvasEle: any = canvas.current;
    canvasEle.width = canvasEle.clientWidth;
    canvasEle.height = canvasEle.clientHeight;
  }

  // draw rectangle
  const draw = () => {
    clear();
    if (!active) return; 
    boxes.map(info => drawFillRect(info));
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
  const drawFillRect = (info: IRectangle) => {
    const { x, y, w, h } = info;
    const backgroundColor = '#4fc3f7';
    const ctx = canvas.current.getContext('2d');
    // dibujar
    ctx.beginPath();
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(x, y, w, h);
  }

  // identify the click event in the rectangle
  const hitBox = (x: number, y: number): boolean => {
    let isTarget = false;
    for (let i = 0; i < boxes.length; i++) {
      const box = boxes[i];
      if (x >= box.x && x <= box.x + box.w && y >= box.y && y <= box.y + box.h) {
        dragTarget = box;
        isTarget = true;
        break;
      }
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

  const handleMouseUp = (e: any) => { 
    dragTarget = null;
    isDown = false;
  }

  const handleMouseOut = (e: any) => {
    handleMouseUp(e);
  }

  useEffect(() => {
    if (canvas?.current) initilize();
  }, [canvas]);

  return {
    draw,
    clear,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseOut
  }
}