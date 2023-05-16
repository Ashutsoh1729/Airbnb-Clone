'use client';
import React from 'react'


interface MenuItemProps{
    onClick?: () => void;
    label?: string;

}




const MenuItem: React.FC<MenuItemProps> = ({
    onClick,label
}) => {
  return (
      <div
          onClick={onClick}
          className='
          py-3
          w-full
          px-4
          transition
          font-semibold  
        hover:bg-neutral-100
          '
      >
          {label}
    </div>
  )
}

export default MenuItem