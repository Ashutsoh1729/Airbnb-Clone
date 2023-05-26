'use client'



import React from 'react'

import { SafeListing, SafeUser } from '../types'
import Container from '../components/Container';
import ListingCard from '../components/listings/ListingCard';
import Heading from '../components/Heading';



interface FavoritesClientProps {
    currentUser?: SafeUser | null;
    listings: SafeListing[];
}


const FavoritesClient: React.FC<FavoritesClientProps> = ({
    listings,
    currentUser
}) => {

   

    
    listings.map((listing: any) => {
        // console.log(listing);
        for (let index in listing) {
            if (index !== "createdAt") {
                console.log(listing[index].title);
            }
        }
    })
    
    

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
                    listings.map((listing: any) => {
                        for (let key in listing) {
                            if (key !== "createdAt") {
                                return (
                                    <ListingCard
                                        currentUser={currentUser}
                                        key={listing[key].id}
                                        data={listing[key]}
                                    />
                                )
                            }
                        }
                    })
                }

                

            </div>
        </Container>
    );
}

export default FavoritesClient








