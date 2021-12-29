import { useEffect } from "react";
export const useWidget = (canvas, active = false) => {
    let isDown = false;
    let dragTarget = null;
    let startX = null;
    let startY = null;
    const info = {
        x: 10, y: 10, w: 150, h: 70
    };
    const infoPosition = info;
    const initilize = () => {
        const canvasEle = canvas.current;
        canvasEle.width = canvasEle.clientWidth;
        canvasEle.height = canvasEle.clientHeight;
    };
    const draw = () => {
        clear();
        if (!active)
            return;
        drawFillRect(info);
    };
    const clear = () => {
        const ctx = canvas.current.getContext('2d');
        ctx.clearRect(0, 0, canvas.current.clientWidth, canvas.current.clientHeight);
    };
    const drawFillRect = (tmpInfo) => {
        const { x, y, w, h } = tmpInfo;
        const backgroundColor = 'rgba(79, 195, 247, 0.7)';
        const ctx = canvas.current.getContext('2d');
        ctx.beginPath();
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(x, y, w, h);
    };
    const hitBox = (x, y) => {
        let isTarget = false;
        if (x >= info.x && x <= info.x + info.w && y >= info.y && y <= info.y + info.h) {
            dragTarget = info;
            isTarget = true;
        }
        return isTarget;
    };
    const handleMouseDown = (e) => {
        startX = parseInt(`${e.nativeEvent.offsetX - canvas.current.clientLeft}`);
        startY = parseInt(`${e.nativeEvent.offsetY - canvas.current.clientTop}`);
        isDown = hitBox(startX, startY);
    };
    const handleMouseMove = (e) => {
        if (!isDown)
            return;
        const mouseX = parseInt(`${e.nativeEvent.offsetX - canvas.current.clientLeft}`);
        const mouseY = parseInt(`${e.nativeEvent.offsetY - canvas.current.clientTop}`);
        const dx = mouseX - startX;
        const dy = mouseY - startY;
        startX = mouseX;
        startY = mouseY;
        dragTarget.x += dx;
        dragTarget.y += dy;
        draw();
    };
    const handleMouseUp = (e, isRecord) => {
        if (!isRecord) {
            infoPosition.x = dragTarget?.x;
            infoPosition.y = dragTarget?.y;
            infoPosition.h = dragTarget?.h;
            infoPosition.w = dragTarget?.w;
        }
        dragTarget = null;
        isDown = false;
    };
    const handleMouseOut = (e) => {
        handleMouseUp(e, true);
    };
    useEffect(() => {
        if (canvas?.current)
            initilize();
    }, [canvas]);
    return {
        infoPosition,
        draw,
        clear,
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
        handleMouseOut
    };
};
