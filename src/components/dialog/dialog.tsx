import React, { useState } from 'react';
import { TCertInfo } from '../../interfaces/certInfo';
import { IEventSigner } from '../../interfaces/event-signet';
import { IRectangle } from '../../interfaces/rectangle';
import { Cert } from '../cert/cert';
import { TViewport } from '../viewer/viewer-layer';

interface TPropsDialog {
  page: number
  viewport: TViewport
  certInfo: TCertInfo
  info: IRectangle | undefined
  onSigner: (form: any) => void
  isVisibled: boolean
}

interface IForm {
  reason: string
  location: string
}

interface IHandle {
  name: string
  value: string
}

export const Dialog = ({
  onSigner,
  certInfo,
  page,
  isVisibled
}: TPropsDialog) => {

  const [form, setForm] = useState<IForm>({
    reason: "Yo Soy el firmante",
    location: "PE/PCL"
  })

 

  const handleForm = ({ name, value }: IHandle) => {
    setForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className='dialog__card'>
      <div className="dialog__body">
        <div className="dialog__group">
          <label>Motivo</label>
          <input type="text"
            name="reason"
            onChange={(e: any) => handleForm(e.target)}
            className='dialog__input'
            value={form?.reason || ''}
          />
        </div>

        <div className="dialog__group">
          <label>Locación</label>
          <input type="text"
            name="location"
            onChange={(e: any) => handleForm(e.target)}
            className='dialog__input'
            value={form?.location || ''}
          />
        </div>

        <div className="dialog__group">
          <label>Página</label>
          <input type="text"
            disabled
            readOnly
            value={page || 1}
            className='dialog__input'
          />
        </div>
      </div>

      <div className="dialog__cert">
        <Cert reason={form?.reason || ''}
          isVisibled={isVisibled}
          certInfo={certInfo}
          urlImage={certInfo.urlImage}
        />
      </div>

      <div className="dialog__footer">
        <button onClick={() => onSigner(form)}
          className='dialog__button primary'
        >
          Firmar
        </button>
      </div>
    </div>
  )
}