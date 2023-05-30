

import React from 'react'
import ClientOnly from '../components/ClientOnly'
import getFavoriteListings from '../actions/getFavoriteListing'
import getCurrentUser from '../actions/getCurrentUser';
import EmptyState from '../components/EmptyState';
import FavoritesClient from './FavoritesClient';

const FavoritesPage = async () => {

    const favoriteListings = await getFavoriteListings();
    const currentUser = await getCurrentUser();

    // console.log(favoriteListings);
    

    if (favoriteListings.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="No favorites found"
                    subtitle="Looks like you have no favorite listings."
                />
            </ClientOnly>
        );
    }



  return (
    //   <ClientOnly>
    //       <EmptyState
    //           title="Under Development"
    //           subtitle="Due to some error it is now in the development"
    //       />
    //     </ClientOnly>
      
      <FavoritesClient
          currentUser={currentUser}
          listings={favoriteListings}
      />
  )
}

export default FavoritesPage









