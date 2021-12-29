/// <reference types="react" />
import '../../assets/css/cert.css';
import { TCertInfo } from '../../interfaces/certInfo';
interface TPropsCertInfo {
    certInfo: TCertInfo;
    reason: string;
}
export declare const Cert: ({ certInfo, reason }: TPropsCertInfo) => JSX.Element;
export {};
