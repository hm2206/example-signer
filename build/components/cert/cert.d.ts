/// <reference types="react" />
import { TCertInfo } from '../../interfaces/certInfo';
interface TPropsCertInfo {
    certInfo: TCertInfo;
    reason: string;
}
export declare const Cert: ({ certInfo, reason }: TPropsCertInfo) => JSX.Element;
export {};
