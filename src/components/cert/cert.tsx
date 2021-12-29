import '../../assets/css/cert.css';
import React from 'react';
import { TCertInfo } from '../../interfaces/certInfo';

interface TPropsCertInfo {
  certInfo: TCertInfo
  reason: string
}

export const Cert = ({ certInfo, reason }: TPropsCertInfo) => {
  return (
    <div className='cert__content'>
      <div className="cert__image">
        <img src="https://firmadigital.unia.edu.pe/file?path=certificate/person_1/image/C6XH4WDRZF.jpg&disk=tmp"
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