/// <reference types="react" />
import { TCertInfo } from '../../interfaces/certInfo';
import { IRectangle } from '../../interfaces/rectangle';
import { TViewport } from '../viewer/viewer-layer';
interface TPropsDialog {
    page: number;
    viewport: TViewport;
    certInfo: TCertInfo;
    info: IRectangle | undefined;
    onSigner: (form: any) => void;
    isVisibled: boolean;
}
export declare const Dialog: ({ onSigner, certInfo, page, isVisibled }: TPropsDialog) => JSX.Element;
export {};
