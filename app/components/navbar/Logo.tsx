'use client'
import React from 'react'
import Image from 'next/image'

const Logo = () => {
    return (
        <div className='pl-2'>
            <Image src={"/images/logo.png"} height={100} width={100} alt='logo'/>
        </div>
    )
}

export default Logo