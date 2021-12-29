/// <reference types="react" />
import { TCertInfo } from '../../interfaces/certInfo';
import { IEventSigner } from '../../interfaces/event-signet';
interface TPropsViewerLayer {
    file: File;
    onClose?: () => void;
    certInfo: TCertInfo;
    onSigner: (data: IEventSigner) => void | any;
}
export declare const ViewerLayer: ({ file, onClose, onSigner, certInfo }: TPropsViewerLayer) => JSX.Element;
export {};
