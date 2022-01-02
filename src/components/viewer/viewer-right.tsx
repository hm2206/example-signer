import React, { useState } from "react";
import { roundTo } from "round-to";
import { IEventSigner, IRectangle, TCertInfo } from "../..";
import { Dialog } from '../dialog/dialog';
import { TViewport } from "./viewer-layer";
import { Settings, X } from 'react-feather';

export interface TPropsViewerRight {
  certInfo: TCertInfo
  viewport: TViewport
  page: number
  info: IRectangle | undefined
  isVisibled: boolean
  onSigner: (event: IEventSigner) => void
}

export const ViewerRight = ({ certInfo, viewport, page, info, isVisibled, onSigner }: TPropsViewerRight) => {
  
  const [show, setShow] = useState(false);

  const handleSigner = (form: any) => {      
    const clientHeight = roundTo(viewport.height / viewport.scale, 2);
    const positionX: number = Math.round(info?.x || 0);

    const currentY = Math.round(info?.y || 0);
    const currentH = Math.round(info?.h || 0);
    const positionY: number = Math.round((clientHeight - currentY) - currentH);

    const data: IEventSigner = {
      isVisibled,
      certId: certInfo.id,
      page,
      reason: form?.reason,
      location: form?.location,
      positionX,
      positionY,
    }

    if (typeof onSigner == 'function') onSigner(data);
  }
  
  return (
    <>
      <Settings className="show-signer"
        onClick={() => setShow(true)}
      />
      <div
        className={`viewer__right__content ${show ? 'active' : ''}`}
      >
        <div className="viewer__right__header">
          <X className="hidden-signer" onClick={() => setShow(false)}/>
          Información del Firmante
        </div>
        <div className="viewer__right__body">
          <Dialog
            onSigner={handleSigner}
            info={info}
            viewport={viewport}
            certInfo={certInfo}
            page={page}
            isVisibled={isVisibled}
          />
        </div>
      </div>
    </>
  )
}