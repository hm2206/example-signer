import '../../assets/css/dialog.css';
import { Cert } from '../cert/cert';

interface TPropsDialog {
  onClose: () => void
}

export const Dialog = ({ onClose }: TPropsDialog) => {

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
              className='dialog__input'
            />
          </div>

          <div className="dialog__group">
            <label>Locación</label>
            <input type="text"
              className='dialog__input'
            />
          </div>

          <div className="dialog__group">
            <label>Dimensión</label>
            <input type="text"
              className='dialog__input'
            />
          </div>
        </div>

        <div className="dialog__cert">
          <Cert/>
        </div>

        <div className="dialog__footer">
          <button onClick={onClose}
            className='dialog__button red'
          >
            Cancelar
          </button>
          <button className='dialog__button primary'>
            Firmar
          </button>
        </div>
      </div>
    </div>
  )
}