import { useLayoutEffect, useState } from "react";
import { roundTo } from "round-to";
export var EPageOrientation;
(function (EPageOrientation) {
    EPageOrientation["landscape"] = "ladscape";
    EPageOrientation["portrait"] = "portrait";
})(EPageOrientation || (EPageOrientation = {}));
const size = {
    height: 0,
    width: 0
};
export const useScreen = (viewerRef) => {
    const [isResize, setIsResize] = useState(false);
    const updateSize = (e) => {
        size.height = viewerRef.current?.clientHeight;
        size.width = viewerRef.current?.clientWidth;
        setIsResize(true);
    };
    const generateScale = (size, nextSize) => {
        const diff = (nextSize - size) / size;
        const scale = 1 + (diff);
        return roundTo(scale, 2);
    };
    const calcSize = ({ height, width }) => {
        const clientHeight = size.height - 80;
        const clientWidth = size.width - 80;
        const isPortrait = height > width ? EPageOrientation.portrait : EPageOrientation.landscape;
        if (isPortrait == EPageOrientation.portrait) {
            const isOutOfRangeWidth = width > clientWidth;
            if (isOutOfRangeWidth)
                return { scale: generateScale(width, clientWidth) };
            return { scale: generateScale(height, clientHeight) };
        }
        return { scale: generateScale(width, clientWidth) };
    };
    useLayoutEffect(() => {
        window.addEventListener('resize', updateSize);
        size.height = viewerRef.current?.clientHeight;
        size.width = viewerRef.current?.clientWidth;
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return {
        size,
        isResize,
        setIsResize,
        updateSize,
        calcSize
    };
};
