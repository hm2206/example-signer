import React from 'react';
import "../../assets/css/widget.css";
import { TCertInfo } from '../../interfaces/certInfo';
import { IEventSigner } from '../../interfaces/event-signet';
interface IPropsWidget {
    height: number;
    width: number;
    certInfo: TCertInfo;
    page: number;
    onSigner: (data: IEventSigner) => void | any;
}
export declare const Widget: React.MemoExoticComponent<({ height, width, certInfo, page, onSigner }: IPropsWidget) => JSX.Element>;
export {};
