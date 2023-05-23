'use client'

import useLoginModal from '@/app/hooks/useLoginModal';
import { SafeListing, SafeReservations, SafeUser } from '@/app/types'
import { useRouter } from 'next/navigation';

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import  { categories } from '@/app/components/navbar/Categories';
import Container from '@/app/components/Container';
import ListingHead from '@/app/components/listings/ListingHead';
import ListingInfo from '@/app/components/listings/ListingInfo';

import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import ListingReservation from '@/app/components/listings/ListingReservation';
import { Range } from 'react-date-range';

interface ListingClientProps {
    listing: SafeListing & {
        user: SafeUser;
    },
    currentUser: SafeUser | null,
    reservations?: SafeReservations[] ,
}


const initialDateRange =  {
    key: "selection",
    startDate: new Date(),
    endDate: new Date()
}



const ListingClient: React.FC<ListingClientProps> = ({
    listing, currentUser, reservations = []
}) => {

    const loginModal = useLoginModal();
    const router = useRouter();


    const disableDates = useMemo(() => {
        let dates: Date[] = [];

        reservations?.forEach((reservation) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate)
            })

            dates = [...dates, ...range];
        })

        return dates
    },[reservations,])


    const category = useMemo(() => {
        return categories.find((item) => item.label == listing.category);
    }, [listing.category])


    
    
    


    const [isLoading, setIsLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(listing.price);
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);



    const onCreateReservation = useCallback(() => {
        if (!currentUser) {
            loginModal.onOpen();
        }
        setIsLoading(true);

        axios.post("/api/reservations", {
            totalPrice,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            listingId: listing?.id
        }).then(() => {

            toast.success("Reservation Successfull.");
            router.refresh();
            // Redirect to the trips page
        }).catch((err) => {
            throw new Error(err);
        }).finally(() => {
            setIsLoading(false);
        })

    }, [
        totalPrice,
        dateRange,
        listing?.id,
        router,
        currentUser,
        loginModal
    ])




    useEffect(() => {
   

        if (dateRange.startDate && dateRange.endDate) {
            const dayCount = differenceInCalendarDays(
                dateRange.endDate,
                dateRange.startDate
            )

            if (dayCount && listing.price) {
                setTotalPrice(dayCount * listing.price);
            } else {
                setTotalPrice(listing.price);
            }

        };
    }, [dateRange,listing.price]);
    


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

                <div className=' order-first md:order-last md:col-span-3 mb-10'>
                    <ListingReservation
                        price={listing.price}
                        totalPrice={totalPrice}
                        dateRange={dateRange}
                        disabled={isLoading}
                        onChangeDate = {(value)=> setDateRange(value)}
                        onSubmit={onCreateReservation}
                        disableDates = {disableDates}
                    />
                </div>


            </div>

        </Container>
    )
}

export default ListingClient