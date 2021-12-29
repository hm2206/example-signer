/// <reference types="react" />
import { TCertInfo } from '../../interfaces/certInfo';
import { IEventSigner } from '../../interfaces/event-signet';
export interface TPropsViewerLayer {
    file: File;
    onClose?: () => void;
    certInfo: TCertInfo;
    onSigner: (data: IEventSigner) => void | any;
}
export interface TViewport {
    height: number;
    width: number;
}
export declare const ViewerLayer: ({ file, onClose, onSigner, certInfo }: TPropsViewerLayer) => JSX.Element;
