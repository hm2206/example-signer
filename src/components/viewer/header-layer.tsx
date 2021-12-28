import { useState } from 'react';
import '../../assets/css/header.css';
import { X } from 'react-feather';

interface TPropsHeaderLayer {
  onPage(value: number): void
  total: number
}

export const HeaderLayer = ({ onPage, total }: TPropsHeaderLayer) => {
  
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
          <X className='cursor__pointer'/>
        </div>
      </div>
    </div>
  )
}