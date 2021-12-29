/// <reference types="react" />
interface IPropsButtonWidget {
    enabled: boolean;
    onEnabled: () => void;
    onSigner: () => void;
    onCancel: () => void;
    onSignerInvisibled: () => void;
}
export declare const ButtonWidget: ({ enabled, onEnabled, onSigner, onSignerInvisibled, onCancel }: IPropsButtonWidget) => JSX.Element;
export {};
