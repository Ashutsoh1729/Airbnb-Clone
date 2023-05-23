'use client'

import useLoginModal from '@/app/hooks/useLoginModal';
import { SafeListing, SafeUser } from '@/app/types'
import { useRouter } from 'next/navigation';

import React, { useMemo, useState } from 'react'
import  { categories } from '@/app/components/navbar/Categories';
import Container from '@/app/components/Container';
import ListingHead from '@/app/components/listings/ListingHead';
import ListingInfo from '@/app/components/listings/ListingInfo';

interface ListingClientProps {
    listing: SafeListing & {
        user: SafeUser;
    },
    currentUser: SafeUser | null,
    reservation?: any,
}




const ListingClient: React.FC<ListingClientProps> = ({
    listing, currentUser, reservation
}) => {

    const loginModal = useLoginModal();
    const router = useRouter();


    const category = useMemo(() => {
        
        return categories.find((item) => item.label == listing.category);

    }, [listing.category])

    console.log(category); // It is provideing a undefined value
    
    
    


    const [isLoading, setIsLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(listing.price);





    return (
        <Container >
            <ListingHead
                title={listing.title}
                imageSrc={listing.imageSrc}
                locationValue={listing.locationValue}
                id={listing.id}
                currentUser={listing.user}
            />
            <div className=' grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6'>
                <ListingInfo
                    user={listing.user}
                    description={listing.description}
                    roomCount={listing.roomCount}
                    guestCount={listing.guestCount}
                    bathroomCount={listing.bathroomCount}
                    locationValue={listing.locationValue}
                    category={category}

                />
            </div>

        </Container>
    )
}

export default ListingClient