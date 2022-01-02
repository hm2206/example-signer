import { IRectangle } from "../interfaces/rectangle";
export interface IPropsWidget {
    current: any;
}
export declare const useWidget: (canvas: IPropsWidget, scale?: number, active?: boolean) => {
    infoPosition: IRectangle;
    draw: () => void;
    clear: () => void;
    handleMouseDown: (e: any) => void;
    handleMouseMove: (e: any) => void;
    handleMouseUp: (e: any) => void;
};
