/// <reference types="react" />
interface IPropsButtonWidget {
    enabled: boolean;
    onEnabled: () => void;
    onCancel: () => void;
}
export declare const ButtonWidget: ({ enabled, onEnabled, onCancel }: IPropsButtonWidget) => JSX.Element;
export {};
