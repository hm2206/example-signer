/// <reference types="react" />
import '../../assets/css/header.css';
interface TPropsHeaderLayer {
    total: number;
    onPage(value: number): void;
    onClose?: () => void;
}
export declare const HeaderLayer: ({ onPage, onClose, total }: TPropsHeaderLayer) => JSX.Element;
export {};
