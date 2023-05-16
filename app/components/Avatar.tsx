'use client';

import Image from 'next/image';
import React from 'react'

const Avatar = () => {
  return (
      <Image
          className='rounded-full'
          src={'/images/placeholder.jpg'}
          alt='Avatar'
          width={30}
          height={30}
      />
  )
}

export default Avatar