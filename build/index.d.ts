/// <reference types="react" />
import { TCertInfo } from './interfaces/certInfo';
import { IEventSigner } from './interfaces/event-signet';
import { IRectangle } from './interfaces/rectangle';
export declare const ViewerLayer: ({ file, onClose, onSigner, certInfo }: import("./components/viewer/viewer-layer").TPropsViewerLayer) => JSX.Element;
export declare const useWidgit: (canvas: import("./hooks/useWidget").IPropsWidget, active?: boolean) => {
    infoPosition: IRectangle;
    draw: () => void;
    clear: () => void;
    handleMouseDown: (e: any) => void;
    handleMouseMove: (e: any) => void;
    handleMouseUp: (e: any, isRecord?: boolean | undefined) => void;
    handleMouseOut: (e: any) => void;
};
export type { TCertInfo, IEventSigner, IRectangle, };
