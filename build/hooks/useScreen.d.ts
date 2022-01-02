export interface ISize {
    height: number;
    width: number;
}
export declare enum EPageOrientation {
    landscape = "ladscape",
    portrait = "portrait"
}
export interface IResponseSize {
    scale: number;
}
export declare const useScreen: (viewerRef: any) => {
    size: ISize;
    isResize: boolean;
    setIsResize: import("react").Dispatch<import("react").SetStateAction<boolean>>;
    updateSize: (e: any) => void;
    calcSize: ({ height, width }: ISize) => IResponseSize;
};
