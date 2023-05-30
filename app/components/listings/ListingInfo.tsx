'use client'


import useCountries from '@/app/hooks/useCountries'
import { SafeUser } from '@/app/types'
import dynamic from 'next/dynamic'
import React from 'react'
import { IconType } from 'react-icons'
import Avatar from '../Avatar'
import ListingCategory from './ListingCategory'

const Map = dynamic(() => import('../Map'), {
    ssr: false
});

interface ListingInfoProps {
    user: SafeUser | null,
    category?: {
        label: string,
        description: string,
        icon: IconType
    },
    description: string,
    roomCount: number,
    bathroomCount: number,
    guestCount: number,
    locationValue: string
}

const ListingInfo: React.FC<ListingInfoProps> = ({
    user, category, description, roomCount, bathroomCount, guestCount, locationValue,
}) => {


    const { getByValue } = useCountries();

    const coordinates = getByValue(locationValue)?.latlng





    return (
        <div className=' flex flex-col col-span-4'>
            <div className="flex flex-col gap-2">
                <div className='
                text-xl 
                font-semibold 
                flex 
                flex-row 
                items-center
                gap-2
                lg:mb-2
            '>
                    <div>Hosted by {user?.name}</div>
                    <Avatar src={user?.image} />
                </div>
                <div
                    className=' 
                        flex flex-row       
                        items-center 
                        gap-4 
                        font-light
                        text-neutral-500
                        mb-4
                        '
                >

                    <div className=''>
                        {guestCount} guests
                    </div>
                    <div className=''>
                        {roomCount} rooms
                    </div>
                    <div className=''>
                        {bathroomCount} bathrooms
                    </div>
                </div>
            </div>


            <hr className='my-4' />

            {category && (
                <ListingCategory
                    icon={category.icon}
                    label={category?.label}
                    description={category?.description}
                />
            )}
            <hr className='my-4' />

            <div className='text-lg font-light text-neutral-500'>
                {description}
            </div>

            <hr className='my-4' />
            <Map center={coordinates} />
        </div>
    )
}

export default ListingInfo