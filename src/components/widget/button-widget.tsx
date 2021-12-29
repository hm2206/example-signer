import React from 'react';
import { Check, X, PenTool } from 'react-feather';

interface IPropsButtonWidget {
  enabled: boolean
  onEnabled: () => void
  onSigner: () => void
  onCancel: () => void
  onSignerInvisibled: () => void
}

export const ButtonWidget = ({ enabled, onEnabled, onSigner, onSignerInvisibled, onCancel }: IPropsButtonWidget) => {

  if (enabled) return (
    <>
      <button className={`widget__button red`}
        onClick={onCancel}
      >
        <X className='widget__icon red'/> 
      </button>
      <button className={`widget__button signer`}
        onClick={onSigner}
      >
        <Check className='widget__icon'/>
      </button>
    </>
  )

  return (
    <>
      <button className={`widget__button`}
        onClick={onEnabled}
      >
        <PenTool className='widget__icon'/>
      </button>

      <button className={`widget__button signer`}
        onClick={onSignerInvisibled}
      >
        <Check className='widget__icon'/>
      </button>
    </>
  );
}