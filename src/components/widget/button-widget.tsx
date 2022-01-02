import React from 'react';
import { Check, X, PenTool } from 'react-feather';

interface IPropsButtonWidget {
  enabled: boolean
  onEnabled: () => void
  onCancel: () => void
}

export const ButtonWidget = ({ enabled, onEnabled, onCancel }: IPropsButtonWidget) => {

  if (enabled) return (
    <>
      <button className={`widget__button red`}
        onClick={onCancel}
      >
        <X className='widget__icon red'/> 
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
    </>
  );
}