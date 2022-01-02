import React from 'react';
import { TCertInfo } from '../../interfaces/certInfo';
import image from '../../../src/image/logo.png';

interface TPropsCertInfo {
  urlImage?: string
  certInfo: TCertInfo
  reason: string,
  isVisibled: boolean
}

export const Cert = ({ certInfo, reason, urlImage, isVisibled }: TPropsCertInfo) => {
  return (
    <div className={`cert__content ${isVisibled ? 'active' : ''}`}>
      <div className="cert__image">
        <img src={urlImage ? urlImage : image}
          alt="cert"
        />
      </div>
      <div className="cert__info">
        <b>{certInfo?.serialNumber}</b>
        <div className='info__title'>
          {certInfo?.displayTitle}
        </div>
        <div>{"<Fecha de Firma>"}</div>
        <div>{reason}</div>
      </div>
    </div>
  )
}