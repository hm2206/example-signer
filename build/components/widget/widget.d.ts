import React from 'react';
import { TCertInfo } from '../../interfaces/certInfo';
import { IRectangle } from '../../interfaces/rectangle';
import { TViewport } from '../viewer/viewer-layer';
interface IPropsWidget {
    viewport: TViewport;
    certInfo: TCertInfo;
    page: number;
    isVisibled: boolean;
    onVisibled: (position: IRectangle) => void | any;
    onRectangle: (position: IRectangle) => void | any;
}
export declare const Widget: React.MemoExoticComponent<({ viewport, onRectangle, onVisibled, isVisibled }: IPropsWidget) => JSX.Element>;
export {};
