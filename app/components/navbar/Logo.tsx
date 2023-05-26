'use client'
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const Logo = () => {

    const router = useRouter();
    return (
        <div className='pl-4 cursor-pointer'>
            <Image
                onClick={()=>router.push('/')}
                src={"/images/logo.png"}
                height={100}
                width={100}
                alt='logo'
            />
        </div>
    )
}

export default Logo