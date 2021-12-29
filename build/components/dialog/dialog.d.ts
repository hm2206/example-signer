/// <reference types="react" />
import '../../assets/css/dialog.css';
import { TCertInfo } from '../../interfaces/certInfo';
import { IEventSigner } from '../../interfaces/event-signet';
import { IRectangle } from '../../interfaces/rectangle';
interface TSize {
    height: number;
    width: number;
}
interface TPropsDialog {
    onClose: () => void;
    page: number;
    certInfo: TCertInfo;
    size: TSize;
    isVisibled: boolean;
    onSigner?: (e: IEventSigner) => void;
    info: IRectangle;
}
export declare const Dialog: ({ onClose, onSigner, certInfo, size, isVisibled, page, info }: TPropsDialog) => JSX.Element;
export {};
