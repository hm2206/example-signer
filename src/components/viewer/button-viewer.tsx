import { useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'react-feather';

type ChangeEmunType = "left" | "right";

interface TPropsButtonChange {
  onClick?: Function
  type: ChangeEmunType
}

export const ButtonViewer = ({ onClick, type }: TPropsButtonChange) => {
  const icon = useMemo(() => {
    return type == 'left' ? <ChevronLeft/> : <ChevronRight/>
  }, [type]);

  return (
    <button className={`viewer__change__page ${type}`}
      onClick={onClick as any}
    >
      {icon}
    </button>
  )
}