'use client'



import React, { useMemo } from 'react'

import { SafeFavoriteListing, SafeListing, SafeUser } from '../types'
import Container from '../components/Container';
import ListingCard from '../components/listings/ListingCard';
import Heading from '../components/Heading';
import { log } from 'console';



interface FavoritesClientProps {
    currentUser?: SafeUser | null;
    listings: SafeListing[] ;
}


const FavoritesClient: React.FC<FavoritesClientProps> = ({
    listings,
    currentUser
}) => {


    let newListingArray: any[] = [];

    newListingArray = useMemo(() => {
        let newArray: any[] = [];
        let [listing]: any = listings;
        
        for (let index in listing) {
            if (index !== "createdAt") {
                newArray.push(listing[index])
            }
        }
        return newArray



    }, [listings])


    console.log(newListingArray.length);


    return (
        <Container>
            <Heading
                title="Favorites"
                subtitle="List of places you favorited!"
            />
            <div
                className="
          mt-10
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        "
            >

                {
                    newListingArray.map((listing: any) => {
                        return (<ListingCard
                            currentUser={currentUser}
                            key={listing.id}
                            data={listing}
                        />)
                    })
                }



            </div>
        </Container>
    );
}

export default FavoritesClient








