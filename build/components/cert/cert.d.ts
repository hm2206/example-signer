import { TCertInfo } from '../../interfaces/certInfo';
interface TPropsCertInfo {
    urlImage?: string;
    certInfo: TCertInfo;
    reason: string;
    isVisibled: boolean;
}
export declare const Cert: ({ certInfo, reason, urlImage, isVisibled }: TPropsCertInfo) => JSX.Element;
export {};
