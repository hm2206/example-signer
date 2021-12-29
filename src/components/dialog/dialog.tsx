import { useState } from 'react';
import '../../assets/css/dialog.css';
import { TCertInfo } from '../../interfaces/certInfo';
import { IEventSigner } from '../../interfaces/event-signet';
import { IRectangle } from '../../interfaces/rectangle';
import { Cert } from '../cert/cert';

interface TSize {
  height: number
  width: number
}

interface TPropsDialog {
  onClose: () => void
  page: number
  certInfo: TCertInfo
  size: TSize 
  isVisibled: boolean
  onSigner?: (e: IEventSigner) => void
  info: IRectangle
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
  onClose,
  onSigner,
  certInfo,
  size,
  isVisibled,
  page,
  info
}: TPropsDialog) => {

  const [form, setForm] = useState<IForm>({
    reason: "Yo Soy el firmante",
    location: "PE/PCL"
  })

  const handleSigner = () => {
    const data: IEventSigner = {
      isVisibled,
      certId: certInfo.id,
      page,
      reason: form?.reason,
      location: form?.location,
      positionX: info?.x,
      positionY: (size.height - info.y) - info.h,
    }

    if (typeof onSigner == 'function') onSigner(data);
  }

  const handleForm = ({ name, value }: IHandle) => {
    setForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className='dialog__content'>
      <div className='dialog__card'>
        <div className="dialog__header">
          Información del Firmante
        </div>
        
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
            <label>Dimensión</label>
            <input type="text"
              disabled
              readOnly
              value={`${size.width}x${size.height}`}
              className='dialog__input'
            />
          </div>

          <div className="dialog__group">
            <label>Firmar {isVisibled ? 'Visible' : 'Invisible'}</label>
          </div>
        </div>

        <div className="dialog__cert">
          <Cert reason={form?.reason || ''}
            certInfo={certInfo}
          />
        </div>

        <div className="dialog__footer">
          <button onClick={onClose}
            className='dialog__button red'
          >
            Cancelar
          </button>
          <button onClick={handleSigner}
            className='dialog__button primary'
          >
            Firmar
          </button>
        </div>
      </div>
    </div>
  )
}