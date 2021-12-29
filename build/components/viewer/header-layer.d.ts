/// <reference types="react" />
interface TPropsHeaderLayer {
    total: number;
    onPage(value: number): void;
    onClose?: () => void;
}
export declare const HeaderLayer: ({ onPage, onClose, total }: TPropsHeaderLayer) => JSX.Element;
export {};
