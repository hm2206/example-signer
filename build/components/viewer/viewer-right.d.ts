/// <reference types="react" />
import { IEventSigner, IRectangle, TCertInfo } from "../..";
import { TViewport } from "./viewer-layer";
export interface TPropsViewerRight {
    certInfo: TCertInfo;
    viewport: TViewport;
    page: number;
    info: IRectangle | undefined;
    isVisibled: boolean;
    onSigner: (event: IEventSigner) => void;
}
export declare const ViewerRight: ({ certInfo, viewport, page, info, isVisibled, onSigner }: TPropsViewerRight) => JSX.Element;
