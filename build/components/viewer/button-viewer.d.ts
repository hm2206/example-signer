/// <reference types="react" />
declare type ChangeEmunType = "left" | "right";
interface TPropsButtonChange {
    onClick?: Function;
    type: ChangeEmunType;
}
export declare const ButtonViewer: ({ onClick, type }: TPropsButtonChange) => JSX.Element;
export {};
