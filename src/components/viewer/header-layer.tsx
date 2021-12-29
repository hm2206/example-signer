import { useState } from 'react';
import '../../assets/css/header.css';
import { X, CheckSquare } from 'react-feather';

interface TPropsHeaderLayer {
  total: number
  onPage(value: number): void
  onClose?: () => void
}

export const HeaderLayer = ({ onPage, onClose, total }: TPropsHeaderLayer) => {
  
  const [currentPage, setCurrentPage] = useState<number | null>();

  const handlePage = (value: string) => {
    if (!value.length) {
      onPage(1);
      return setCurrentPage(null);
    }
    // send page
    const currentPage = parseInt(value)
    if (currentPage <= total) {
      onPage(currentPage);
      setCurrentPage(currentPage);
    }
  }

  return (
    <div className='viewer__header'>
      <div className='header__content'>
        <div className='header__left'>
          <input type="text"
            onChange={({ target }) => handlePage(target.value)}
            className='header__search'
            placeholder='Pág'
            value={currentPage || ''}
          /> / {total}
        </div>
        <div className="header__right">
          <X className='cursor__pointer'
            onClick={onClose}
          />
        </div>
      </div>
    </div>
  )
}