import { useLayoutEffect, useState } from "react";
import { roundTo } from "round-to";

export interface ISize {
  height: number;
  width: number;
}

export enum EPageOrientation { 
  landscape = 'ladscape',
  portrait = 'portrait'
}

export interface IResponseSize {
  scale: number
}

const size: ISize = {
  height: 0,
  width: 0
}

export const useScreen = (viewerRef: any) => {

  const [isResize, setIsResize] = useState(false);

  const updateSize = (e: any) => {
    size.height = viewerRef.current?.clientHeight;
    size.width = viewerRef.current?.clientWidth;
    setIsResize(true);
  } 

  const generateScale = (size: number, nextSize: number): number => {
    const diff: number = (nextSize - size) / size;
    const scale = 1 + (diff);
    return roundTo(scale, 2);
  }

  const calcSize = ({ height, width }: ISize): IResponseSize => {
    const clientHeight = size.height - 80;
    const clientWidth = size.width - 80;
    const isPortrait: EPageOrientation = height > width ? EPageOrientation.portrait : EPageOrientation.landscape;

    if (isPortrait == EPageOrientation.portrait) {
      const isOutOfRangeWidth: boolean = width > clientWidth;
      if (isOutOfRangeWidth) return { scale: generateScale(width, clientWidth) };
      return { scale: generateScale(height, clientHeight) }
    }

    return { scale: generateScale(width, clientWidth) }  
  }

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
  }
}
